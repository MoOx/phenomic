import path from "path"
import { sync as rm } from "rimraf"
import { sync as mkdir } from "mkdirp"
import color from "chalk"
import nanoLogger from "nano-logger"

import webpack from "./webpack"
import devServer from "./dev-server"

import filenameToUrl from "../filename-to-url"

export default function(options) {
  const {
    config,
    source,
  } = options

  const log = nanoLogger("statinamic/lib/builder")

  JSON.stringify(config, null, 2).split("\n").forEach(l => log(l))

  const dest = options.clientWebpackConfig.output.path

  // cleanup
  rm(dest)
  mkdir(dest)

  if (config.__DEVSERVER__) {
    devServer(options.clientWebpackConfig, {
      protocol: config.__SERVER_PROTOCOL__,
      host: config.__SERVER_HOSTNAME__,
      port: config.__SERVER_PORT__,
      open: process.argv.includes("--open"),
    })
  }
  else {
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
        require(path.join(dest, "..", "statinamic-static"))({
          urls: [
            ...options.urls || [],
            ...getMdUrlsFromWebpackStats(stats, source),
          ],
          pagesData,
          dest,
        })
      })
    })
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
