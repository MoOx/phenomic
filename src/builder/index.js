import path from "path"
import fs from "fs-extra"
import color from "chalk"
import nanoLogger from "nano-logger"

import webpack from "./webpack"
import devServer from "./server"

import filenameToUrl from "../filename-to-url"
import toStaticHTML from "../static"

export default function(options) {
  const {
    config,
    layouts,
    metadata,
    routes,
    store,
  } = options

  const log = nanoLogger("statinamic/lib/builder")
  // JSON.stringify(config, null, 2).split("\n").forEach(l => log(l))

  const destination = path.join(config.cwd, config.destination)
  fs.emptyDirSync(destination)

  if (config.static) {
    // Copy static assets to build folder
    if (config.assets !== undefined) {
      const copyDest = path.join(destination, config.assets.route)
      fs.copySync(config.assets.path, copyDest)
      log(color.green("✓ Static assets: copy static assets completed"))
    }

    webpack(options.clientWebpackConfig, log, (stats) => {
      log(color.green("✓ Static assets: client build completed"))

      // There is probably a better way to get markdown as json without reading
      // fs, but I am tired
      const pagesData = {}
      const assetsFiles = {
        css: [],
        js: [],
      }
      const assets = stats.compilation.assets
      Object.keys(assets).forEach((name) => {
        if (name.endsWith("index.json")) {
          const url = filenameToUrl(name)
          pagesData[url] = JSON.parse(assets[name]._value)
        }

        if (name.endsWith(".js")) {
          assetsFiles.js.push(name)
        }

        if (name.endsWith(".css")) {
          assetsFiles.css.push(name)
        }
      })

      toStaticHTML({
        ...config,
        urls: [
          ...options.urls || [],
          ...getMdUrlsFromWebpackStats(stats, config.source),
        ],
        pagesData,
        assetsFiles,
        layouts,
        metadata,
        routes,
        store,
      })
    })
  }
  else if (config.server) {
    devServer(options.clientWebpackConfig, {
      config,
      layouts,
      metadata,
      routes,
      store,
    })
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
