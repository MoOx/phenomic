import { join } from "path"
import { execSync } from "child_process"

import express, { Router } from "express"
import webpack from "webpack"
import webpackDevMiddleware from "webpack-dev-middleware"
import webpackHotMiddleware from "webpack-hot-middleware"
import historyFallbackMiddleware from "connect-history-api-fallback"
import portFinder from "portfinder"
import opn from "opn"

import log from "../_utils/log"
// module.exports is used
// eslint-disable-next-line import/default
import PhenomicLoaderWebpackPlugin from "../loader/plugin.js"
import minifyCollection from "../loader/minify"
import serialize from "../_utils/serialize"
import pathToUri from "../_utils/path-to-uri"
import webpackVersion from "../_utils/webpack-version"

import { handleInvalid, handleDone } from "./webpack/log-formatter.js"

const devServerNoScript = (
`Phenomic development server requires JavaScript.
If you want to check our your website works without JavaScript, you need to
build the static version and server the result.
You can do this by doing: <code>npm run build -- --serve</code>
`
)

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
      entry: {
        // add devEntries
        ...Object.keys(webpackConfig.entry).reduce((acc, key) => ({
          ...acc,
          [key]: [
            ...devEntries,
            ...Array.isArray(webpackConfig.entry[key])
              ? webpackConfig.entry[key]
              : [ webpackConfig.entry[key] ],
          ],
        }), {}),
      },
      plugins: [
        ...(webpackConfig.plugins || []),

        // for hot-middleware
        ...(
          webpackVersion() === 2
          ? [ new webpack.optimize.OccurrenceOrderPlugin() ]
          : [ new webpack.optimize.OccurenceOrderPlugin() ]
        ),
        new webpack.HotModuleReplacementPlugin(),
        ...(
          webpackVersion() === 2
          ? new webpack.NoEmitOnErrorsPlugin()
          : new webpack.NoErrorsPlugin()
        ),
      ],
    }

    // webpack dev + hot middlewares
    const webpackCompiler = webpack(devConfig)

    server.use(webpackDevMiddleware(webpackCompiler, {
      publicPath: webpackConfig.output.publicPath,
      // skip compilation logs if !verbose
      noInfo: !config.verbose,
      quiet: !config.verbose,
      ...devConfig.devServer,
    }))
    server.use(webpackHotMiddleware(webpackCompiler, {
      // skip hot middleware logs if !verbose
      log: config.verbose ? undefined : () => {},
    }))

    let entries = []
    webpackCompiler.plugin("done", function(stats) {
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

    // if !verbose, use our custom minimal output
    if (!config.verbose) {
      handleInvalid() // start "Updating"
      webpackCompiler.plugin("invalid", handleInvalid)
      webpackCompiler.plugin("done", handleDone)
    }

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
    router.use(historyFallbackMiddleware({
      // https://github.com/MoOx/phenomic/issues/808
      disableDotRule: true,
    }))

    // webpack static ressources
    router.get("*", express.static(webpackConfig.output.path))

    // hardcoded entry point
    router.get("/index.html", (req, res) => {
      const collectionMin = minifyCollection(
        PhenomicLoaderWebpackPlugin.collection
      )
      res.setHeader("Content-Type", "text/html")
      /* eslint-disable max-len */
      res.end(
  `<!doctype html>
  <html>
  <head><meta charset="utf8" /></head>
  <body>
    <div id="phenomic">
      <div
        id="phenomic-DevLoader"
        style="color: red; font: caption; font-size: 2rem; padding: 40vh 10vw; text-align: center;"
      >
        <script>
        window.onerror = function(e) {
          var devLoader = document.querySelector("#phenomic-DevLoader")
          if (devLoader) { devLoader.innerHTML = e.toString() }
          // only need to use this code once
          window.onerror = null
        }
        </script>
        <noscript>${ devServerNoScript }</noscript>
      </div>
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
      /* eslint-enable max-len */
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
      log(`Development server listening on ${ href }`)

      if (config.open) {
        const openUrl = href.replace(devHost, "localhost")
        if (process.platform === "darwin") {
          try {
            // Try our best to reuse existing tab
            // on OS X Google Chrome with AppleScript
            execSync("ps cax | grep \"Google Chrome\"")
            execSync(
              "osascript openChrome.applescript " + openUrl,
              { cwd: __dirname, stdio: "ignore" }
            )
            return true
          }
          catch (err) {
            // Ignore errors.
          }
        }
        // Fallback to opn
        // (It will always open new tab)
        opn(openUrl)
      }
    })
  })
}
