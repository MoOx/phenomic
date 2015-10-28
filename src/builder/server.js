import express, { Router } from "express"
import webpack from "webpack"
import webpackNanoLogs from "webpack-nano-logs"
import webpackDevMiddleware from "webpack-dev-middleware"
import webpackHotMiddleware from "webpack-hot-middleware"
import historyFallbackMiddleware from "connect-history-api-fallback"
import WebpackErrorNotificationPlugin from "webpack-error-notification"

import opn from "opn"
import logger from "nano-logger"

const log = logger("statinamic/builder/server")

export default (config, options = {}) => {
  options = {
    open: true,
    noDevEntriesTest: /^tests/,
    ...options,
  }

  if (!options.baseUrl) {
    throw new Error(
      "You must provide a 'baseUrl' object that contains the following keys:" +
      "'href', 'port', 'hostname'. See https://nodejs.org/api/url.html"
    )
  }

  const devEntries = [
    require.resolve(`webpack-hot-middleware/client`),
  ]

  const devConfig = {
    ...config,
    debug: true,
    watch: true,
    colors: true,
    progress: true,
    entry: {
      // add devEntries
      ...Object.keys(config.entry)
        .reduce(
          (acc, key) => {
            // some entries do not need extra stuff
            acc[key] = key.match(options.noDevEntriesTest) !== null
              ? config.entry[key]
              : [
                ...devEntries,
                ...Array.isArray(config.entry[key])
                  ? config.entry[key]
                  : [ config.entry[key] ],
              ]
            return acc
          },
          {}
        ),
    },
    plugins: [
      ...(config.plugins || []),
      ...(options.plugins || []),
      new webpack.optimize.OccurenceOrderPlugin(),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
      webpackNanoLogs,
      new WebpackErrorNotificationPlugin(),
    ],
    eslint: {
      ...config.eslint,
      emitWarning: true,
    },
  }

  const router = Router()
  router.use(historyFallbackMiddleware())

  router.get("*", express.static(config.output.path))

  // hardcoded entry point
  router.get("/index.html", (req, res) => {
    res.setHeader("Content-Type", "text/html")
    res.end(
`<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
</head>
<body>
  <div id="statinamic">...</div>
  <script src="${ options.baseUrl.path }statinamic-client.js"></script>
</body>
</html>`
    )
  })

  const server = express()
  const webpackCompiler = webpack(devConfig)
  server.use(webpackDevMiddleware(webpackCompiler, {
    publicPath: config.output.publicPath,
    stats: {
      colors: true,
      // hide all chunk dependencies because it's unreadable
      chunkModules: false,
      // noize
      assets: false,
    },
    noInfo: true,
  }))
  server.use(options.baseUrl.pathname, router)
  server.use(webpackHotMiddleware(webpackCompiler))
  server.listen(options.baseUrl.port, options.baseUrl.hostname, (err) => {
    if (err) {
      log(err)

      return
    }
    log(`Dev server started on ${ options.baseUrl.href }`)
    if (options.open) {
      opn(`${ options.baseUrl.href }`)
    }
  })
}
