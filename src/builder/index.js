import path from "path"
import { sync as rm } from "rimraf"
import { sync as mkdir } from "mkdirp"
import color from "chalk"
import nanoLogger from "nano-logger"

import webpack from "./webpack"
import devServer from "./server"

import filenameToUrl from "../filename-to-url"

export default function(options) {
  const {
    config,
  } = options

  const log = nanoLogger("statinamic/lib/builder")

  JSON.stringify(config, null, 2).split("\n").forEach(l => log(l))

  const destination = path.join(config.cwd, config.destination)
  rm(destination)
  mkdir(destination)

  const startDevServer = () => {
    devServer(options.clientWebpackConfig, {
      baseUrl: config.baseUrl,
      open: config.open,
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
