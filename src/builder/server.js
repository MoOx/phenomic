import { join } from "path"
import express, { Router } from "express"
import webpack from "webpack"
import webpackDevMiddleware from "webpack-dev-middleware"
import webpackHotMiddleware from "webpack-hot-middleware"
import historyFallbackMiddleware from "connect-history-api-fallback"
import WebpackErrorNotificationPlugin from "webpack-error-notification"

import opn from "opn"
import debug from "debug"
import portFinder from "portfinder"

import minifyCollection from "../content-loader/minify"
import serialize from "../_utils/serialize"

import collection from "../content-loader/cache.js"
import pathToUri from "../_utils/path-to-uri"

const log = debug("phenomic:builder:server")

export default (config) => {
  const { webpackConfigBrowser: webpackConfig } = config

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
          .reduce((acc, key) => {
            // some entries do not need extra stuff
            acc[key] = [
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
      log("Webpack compilation done")

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

    // fallback to index for unknow pages?
    router.use(historyFallbackMiddleware())

    // webpack static ressources
    router.get("*", express.static(webpackConfig.output.path))

    // hardcoded entry point
    router.get("/index.html", (req, res) => {
      const collectionMin = minifyCollection(collection)
      res.setHeader("Content-Type", "text/html")
      res.end(
  `<!doctype html>
  <html>
  <head><meta charset="utf8" /></head>
  <body>
    <div id="phenomic">
      ...
    </div>
    <script>
    window.__COLLECTION__ = ${
      serialize(collectionMin)
    };
    </script>
    ${
      entries.map((fileName) =>
        `<script src="${
          pathToUri(config.baseUrl.pathname, fileName)
        }"></script>`
      )
    }
  </body>
  </html>`
      )
    })
  }

  // THAT'S IT
  const { devHost, devPort } = config

  portFinder.basePort = devPort

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
