import { join } from "path"
import express, { Router } from "express"
import webpack from "webpack"
import webpackDevMiddleware from "webpack-dev-middleware"
import webpackHotMiddleware from "webpack-hot-middleware"
import WebpackErrorNotificationPlugin from "webpack-error-notification"

import opn from "opn"
import debug from "debug"
import portFinder from "portfinder"

import collection from "../content-loader/cache.js"
import urlAsHtml from "../static/to-html/url-as-html"
import * as pagesActions from "../redux/modules/pages"
import cleanNodeCache from "../_utils/clean-node-cache"
import joinUri from "../_utils/join-uri"
import redBoxRenderer from "../_utils/redbox-renderer"

const log = debug("phenomic:builder:server")

let firstRun = true

export default (options = {}) => {
  options = {
    noDevEntriesTest: /^tests/,
    ...options,
  }
  const { config } = options
  const { webpackConfigClient: webpackConfig } = config

  if (!config.baseUrl) {
    throw new Error(
      "You must provide a 'baseUrl' object that contains the following keys:" +
      "'href', 'port', 'hostname'. See https://nodejs.org/api/url.html"
    )
  }

  const server = express()

  if (config.static && config.server) {
    server.use(
      config.baseUrl.pathname,
      express.static(join(config.cwd, config.destination))
    )
  }
  else {
    const devEntries = [
      require.resolve("webpack-hot-middleware/client"),
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

    // webpack requirements
    const webpackCompiler = webpack(devConfig)

    server.use(webpackDevMiddleware(webpackCompiler, {
      publicPath: webpackConfig.output.publicPath,
      noInfo: !config.verbose,
      ...devConfig.devServer,
    }))

    // HMR
    server.use(webpackHotMiddleware(webpackCompiler))

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

    // user static assets
    if (config.assets) {
      server.use(
        config.baseUrl.pathname + config.assets.route,
        express.static(config.assets.path)
      )
    }

    // routing for the part we want (starting to the baseUrl pathname)
    const router = Router()
    server.use(config.baseUrl.pathname, router)

    // webpack static ressources
    router.get("*", express.static(webpackConfig.output.path))

    // prerender pages when possible
    const memoryFs = webpackCompiler.outputFileSystem
    router.get("*", (req, res, next) => {
      let item = getItemOrContinue(
        collection,
        config.baseUrl,
        req,
        res
      )

      // try 404.html if there is any
      if (!item) {
        req.url = "/404.html"
        item = getItemOrContinue(
          collection,
          config.baseUrl,
          req,
          res
        )
      }

      if (!item) {
        next()
        return
      }
      const filepath = join(config.cwd, config.destination, item.__dataUrl)
      const fileContent = memoryFs.readFileSync(filepath)
      const json = JSON.parse(fileContent.toString())

      options.store.dispatch({
        type: pagesActions.SET,
        page: item.__url,
        response: {
          json,
        },
      })

      if (!firstRun) {
        cleanNodeCache(config.cwd)
      }
      firstRun = false

      urlAsHtml(item.__url, {
        exports: options.exports,
        store: options.store,
        collection,
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
        res.setHeader("Content-Type", "text/html")
        res.end(redBoxRenderer(err))
      })
    })
  }

  // THAT'S IT
  const { devHost, devPort } = config

  portFinder.basePort = parseInt(devPort, 10)

  portFinder.getPort((err, port) => {
    if (err) {
      throw err
    }

    if (port !== devPort) {
      log(`Port ${ devPort } is not available. Using port ${ port } instead.`)
    }
    server.listen(port, devHost, (err) => {
      if (err) {
        throw err
      }
      const href = `http://${ devHost }:${ port }${ config.baseUrl.pathname }`
      log(`Dev server started on ${ href }`)
      if (config.open) {
        opn(href.replace(devHost, "localhost"))
      }
    })
  })
}

export function getItemOrContinue(collection, baseUrl, req, res) {
  const __url = req.url
    .replace(/index\.html$/, "")
  const item = collection.find((item) => item.__url === __url)
  if (!item) {
    log("%s not found", __url)
    const folderUrl = __url + "/"
    if (collection.find((item) => item.__url === folderUrl)) {
      const newUrl = req.url + "/"
      log("Redirecting to %s", newUrl)
      res.redirect(joinUri(baseUrl.pathname, newUrl))
    }
    return false
  }

  return item
}
