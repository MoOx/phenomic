import { join } from "path"
import express, { Router } from "express"
import webpack from "webpack"
import webpackDevMiddleware from "webpack-dev-middleware"
import webpackHotMiddleware from "webpack-hot-middleware"
import historyFallbackMiddleware from "connect-history-api-fallback"
import WebpackErrorNotificationPlugin from "webpack-error-notification"

import opn from "opn"
import debug from "debug"

import collection from "../md-collection-loader/cache.js"
import urlAsHtml from "../static/to-html/url-as-html"
import * as pagesActions from "../redux/modules/pages"
import { fileExtensionRE } from "../_utils/urlify"
import cleanNodeCache from "../_utils/clean-node-cache"

const log = debug("statinamic:builder:server")
let firstRun = true

export default (webpackConfig, options = {}) => {
  options = {
    noDevEntriesTest: /^tests/,
    ...options,
  }
  const { config } = options

  if (!config.baseUrl) {
    throw new Error(
      "You must provide a 'baseUrl' object that contains the following keys:" +
      "'href', 'port', 'hostname'. See https://nodejs.org/api/url.html"
    )
  }

  const devEntries = [
    require.resolve(`webpack-hot-middleware/client`),
  ]

  const devConfig = {
    ...webpackConfig,
    // debug: true,
    // watch: true,
    // colors: true,
    entry: {
      // add devEntries
      ...Object.keys(webpackConfig.entry)
        .reduce(
          (acc, key) => {
            // some entries do not need extra stuff
            acc[key] = key.match(options.noDevEntriesTest) !== null
              ? webpackConfig.entry[key]
              : [
                ...devEntries,
                ...Array.isArray(webpackConfig.entry[key])
                  ? webpackConfig.entry[key]
                  : [ webpackConfig.entry[key] ],
              ]
            return acc
          },
          {}
        ),
    },
    plugins: [
      ...(webpackConfig.plugins || []),
      ...(options.plugins || []),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      new WebpackErrorNotificationPlugin(),
    ],
    eslint: {
      ...webpackConfig.eslint,
      emitWarning: true,
    },
  }

  const server = express()

  // webpack requirements
  const webpackCompiler = webpack(devConfig)

  server.use(webpackDevMiddleware(webpackCompiler, {
    publicPath: webpackConfig.output.publicPath,
    noInfo: !config.verbose,
    ...devConfig.devServer,
  }))

  let entries = []
  webpackCompiler.plugin("done", function(stats) {
    // reset entries
    entries = []
    const namedChunks = stats.compilation.namedChunks
    Object.keys(namedChunks).forEach((chunkName) => {
      entries = [
        ...entries,
        ...namedChunks[chunkName].files.filter(
          (file) => !file.endsWith(".hot-update.js")
        ),
      ]
    })
  })

  // routing for the part we want (starting to the baseUrl pathname)
  const router = Router()
  server.use(config.baseUrl.pathname, router)

  // fallback to index for unknow pages?
  router.use(historyFallbackMiddleware())

  // webpack static ressources
  router.get("*", express.static(webpackConfig.output.path))

  // user static assets
  if (config.assets) {
    server.use(
      config.baseUrl.pathname + config.assets.route,
      express.static(config.assets.path)
    )
  }

  // prerender pages when possible
  const memoryFs = webpackCompiler.outputFileSystem
  router.get("*", (req, res, next) => {
    const item = getItemOrContinue(collection, req, res, next)
    if (item) {
      const relativeUri = item.__dataUrl.replace(config.baseUrl.pathname, "")
      const filepath = join(config.cwd, config.destination, relativeUri)
      const fileContent = memoryFs.readFileSync(filepath)
      const data = JSON.parse(fileContent.toString())
      options.store.dispatch({
        type: pagesActions.SET,
        page: req.originalUrl,
        response: {
          data,
        },
      })

      if (!firstRun) {
        cleanNodeCache(config.cwd)
      }
      firstRun = false

      urlAsHtml(req.originalUrl, {
        exports: options.exports,
        store: options.store,
        // collection: options.collection,
        baseUrl: config.baseUrl,
        assetsFiles: {
          js: entries,
          css: !config.dev,
        },
      })
      .then(
        (html) => {
          res.setHeader("Content-Type", "text/html")
          res.end(html)
        }
      )
      .catch((err) => {
        log(err)
        res.setHeader("Content-Type", "text/plain")
        res.end(err.toString())
      })
    }
  })

  // HMR
  server.use(webpackHotMiddleware(webpackCompiler))

  // THAT'S IT
  server.listen(config.baseUrl.port, config.baseUrl.hostname, (err) => {
    if (err) {
      log(err)

      return
    }
    log(`Dev server started on ${ config.baseUrl.href }`)
    if (config.open) {
      opn(`${ config.baseUrl.href }`)
    }
  })
}

export function getItemOrContinue(collection, req, res, next) {
  const item = collection.find((item) => item.__url === req.originalUrl)
  if (!item) {
    const folderUrl = req.originalUrl + "/"
    if (collection.find((item) => item.__url === folderUrl)) {
      res.redirect(folderUrl)
    }
    else {
      next()
    }
    return false
  }

  return item
}
