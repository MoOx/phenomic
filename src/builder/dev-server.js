import express from "express"
import webpack from "webpack"
import webpackNanoLogs from "webpack-nano-logs"
import webpackDevMiddleware from "webpack-dev-middleware"
import webpackHotMiddleware from "webpack-hot-middleware"
import historyFallbackMiddleware from "connect-history-api-fallback"
import WebpackErrorNotificationPlugin from "webpack-error-notification"

import opn from "opn"
import logger from "nano-logger"

const log = logger("webpack-dev-server")

export default (config, options) => {
  options = {
    protocol: "http://",
    host: "0.0.0.0",
    port: 3000,
    open: true,
    noDevEntriesTest: /^tests/,
    ...(options || {}),
  }

  const serverUrl = `${ options.protocol }${ options.host }:${ options .port }`

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

  const server = express()
  server.use(historyFallbackMiddleware())

  const webpackCompiler = webpack(devConfig)
  server.use(webpackDevMiddleware(webpackCompiler, {
    https: options.protocol === "https://",
    contentBase: config.output.path,
    hot: true,
    stats: {
      colors: true,
      // hide all chunk dependencies because it's unreadable
      chunkModules: false,
      // noize
      assets: false,
    },
    noInfo: true,
  }))
  server.use(webpackHotMiddleware(webpackCompiler))

  server.get("*", express.static(config.output.path))

  server.listen(options.port, options.host, (err) => {
    if (err) {
      log(err)

      return
    }
    log(`Dev server started on ${ serverUrl }`)
    if (options.open) {
      opn(`${ serverUrl }`)
    }
  })
}
