import path from "path"
import fs from "fs-extra"
import color from "chalk"
import nanoLogger from "nano-logger"

import webpack from "./webpack"
import devServer from "./server"

import filenameToUrl from "../filename-to-url"

export default function(options) {
  const {
    config,
  } = options

  // Prepare staticAssets path and route
  let { staticAssets } = options
  if (staticAssets !== undefined) {
    if (typeof staticAssets === "string") {
      staticAssets = {
        path: path.join(config.cwd, config.source, staticAssets),
        route: staticAssets,
      }
    }
    else if (
      staticAssets.hasOwnProperty("path") &&
      staticAssets.hasOwnProperty("route")
    ) {
      staticAssets = {
        path: path.join(config.cwd, config.source, staticAssets.path),
        route: staticAssets.route,
      }
    }
    else {
      throw new TypeError (
        "staticAssets should be a string " +
        "or an object with 2 keys: path and route"
      )
    }
  }

  const log = nanoLogger("statinamic/lib/builder")

  JSON.stringify(config, null, 2).split("\n").forEach(l => log(l))

  const destination = path.join(config.cwd, config.destination)
  fs.emptyDirSync(destination)

  const startDevServer = () => {
    devServer(options.clientWebpackConfig, {
      baseUrl: config.baseUrl,
      open: config.open,
      staticAssets,
    })
  }

  if (config.static) {
    webpack(options.clientWebpackConfig, log, (stats) => {
      log(color.green("✓ Static assets: client build completed"))

      // There is probably a better way to get markdown as json without reading
      // fs, but I am tired
      const pagesData = {}
      const assets = stats.compilation.assets
      Object.keys(assets).forEach((name) => {
        if (name.endsWith("index.json")) {
          const url = filenameToUrl(name)
          pagesData[url] = JSON.parse(assets[name]._value)
        }
      })

      // Copy static assets to build folder
      if (staticAssets !== undefined) {
        const copyDest = path.join(destination, staticAssets.route)
        fs.copySync(staticAssets.path, copyDest)
        log(color.green("✓ Static assets: copy static assets completed"))
      }

      webpack(options.staticWebpackConfig, log, () => {
        log(color.green("✓ Static assets: static build completed"))

        // use webpack static builded node script
        const statinamicStatic = path.join(
          options.staticWebpackConfig.output.path, "statinamic-static"
        )
        require(statinamicStatic)({
          urls: [
            ...options.urls || [],
            ...getMdUrlsFromWebpackStats(stats, config.source),
          ],
          pagesData,
          ...config,
        })

        .then(() => {
          if (config.server) {
            startDevServer()
          }
        })
      })
    })
  }
  else if (config.server) {
    startDevServer()
  }
  else {
    throw new Error("You need to specify --static or --server")
  }
}

function getMdUrlsFromWebpackStats(stats, source) {
  return stats.compilation.fileDependencies.reduce(
    (array, filename) => ([
      ...(filename.match(/\.md$/) ? [ filenameToUrl(filename, source) ] : []),
      ...array,
    ]),
    []
  )
}
