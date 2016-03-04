import path from "path"
import fs from "fs-extra"
import color from "chalk"
import debug from "debug"

import webpack from "./webpack"
import devServer from "./server"

import collection from "../content-loader/cache"
import toStaticHTML from "../static"

export default function(options) {
  const {
    config,
    store,
    exports,
  } = options

  const log = debug("statinamic:builder")

  const destination = path.join(config.cwd, config.destination)
  fs.emptyDirSync(destination)

  if (config.static) {
    // Copy static assets to build folder
    if (config.assets) {
      const copyDest = path.join(destination, config.assets.route)
      fs.copySync(config.assets.path, copyDest)
      log(color.green("✓ Static assets: copy static assets completed"))
    }

    webpack(options.clientWebpackConfig, log, (stats) => {
      log(color.green("✓ Static assets: client build completed"))

      const assetsFiles = {
        css: [],
        js: [],
      }
      const assets = stats.toJson().assetsByChunkName

      // Flatten object of arrays
      // sort a-z => predictable chunks order
      Object.keys(assets)
        .reduce((result, key) => {
          const chunkAssets = assets[key]
          return result.concat(chunkAssets)
        }, [])
        .sort((a, b) => (a.toLowerCase() > b.toLowerCase()) ? 1 : -1)
        .forEach((name) => {
          if (name.endsWith(".js")) {
            assetsFiles.js.push(name)
          }
          else if (name.endsWith(".css")) {
            assetsFiles.css.push(name)
          }
        })

      toStaticHTML({
        ...config,
        urls: [
          ...options.urls || [],
          ...collection.map((item) => item.__url),
        ],
        collection,
        assetsFiles,
        exports,
        store,
      })
      .then(() => {
        if (config.server) {
          devServer(null, { config })
        }
      })
      .catch((error) => {
        log(color.red("✗ Faild to start static server"))
        setTimeout(() => {
          throw error
        }, 1)
      })
    })
  }
  else if (config.server) {
    devServer(options.clientWebpackConfig, {
      config,
      exports,
      store,
    })
  }
  else {
    throw new Error("You need to specify --static or --server")
  }
}
