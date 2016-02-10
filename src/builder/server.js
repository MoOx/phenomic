import { join } from "path"
import express, { Router } from "express"
import webpack from "webpack"
import webpackNanoLogs from "webpack-nano-logs"
import webpackDevMiddleware from "webpack-dev-middleware"
import webpackHotMiddleware from "webpack-hot-middleware"
import historyFallbackMiddleware from "connect-history-api-fallback"
import WebpackErrorNotificationPlugin from "webpack-error-notification"

import opn from "opn"
import logger from "nano-logger"

import filenameToUrl from "../filename-to-url"
import urlAsHtml from "../static/to-html/url-as-html"
import * as pagesActions from "../redux/modules/pages"
// import htmlMetas from "../html-metas"

const log = logger("statinamic/builder/server")

export default (webpackConfig, options = {}) => {
  options = {
    open: true,
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
      webpackNanoLogs,
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
  }))

  // routing for the part we want (starting to the baseUrl pathname)
  const router = Router()
  server.use(config.baseUrl.pathname, router)

  // fallback to index for unknow pages?
  router.use(historyFallbackMiddleware())

  // webpack static ressources
  router.get("*", express.static(webpackConfig.output.path))

  // user static assets
  if (config.assets !== undefined) {
    server.use(
      config.baseUrl.pathname + config.assets.route,
      express.static(config.assets.path)
    )
  }

  // prerender pages when possible
  const memoryFs = webpackCompiler.outputFileSystem
  router.get("*", (req, res, next) => {
    //                                       ↓ remove first slash
    const uri = filenameToUrl(req.originalUrl.slice(1))
    const relativeUri = req.originalUrl.replace(config.baseUrl.pathname, "")
    const filepath = join(
      config.cwd, config.destination, relativeUri, "index.json"
    )

    let fileContent
    try {
      fileContent = memoryFs.readFileSync(filepath)
    }
    catch (err) {
      // this is probably not a page
      console.log(`'${ filepath }' doesn't like a dynamic page (no data).`)
    }

    if (!fileContent) {
      next()
    }
    else {
      if (!req.originalUrl.endsWith("/")) {
        res.redirect(req.originalUrl + "/")
      }

      log(
        `Using '${ filepath }' to pre-render '${ req.originalUrl }' (${ uri })`
      )
      const data = JSON.parse(fileContent.toString())
      options.store.dispatch({
        type: pagesActions.SET,
        page: uri,
        response: {
          data,
        },
      })
      urlAsHtml(uri, {
        layouts: options.layouts,
        metadata: options.metadata,
        routes: options.routes,
        store: options.store,

        baseUrl: config.baseUrl,
        css: !config.dev,
      })
      .then(
        (html) => {
          res.setHeader("Content-Type", "text/html")
          res.end(html)
        }
      )
      .catch((err) => {
        console.log(err)
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
    if (options.open) {
      opn(`${ config.baseUrl.href }`)
    }
  })
}
