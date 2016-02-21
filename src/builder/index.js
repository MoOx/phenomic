import path from "path"
import fs from "fs-extra"
import color from "chalk"
import debug from "debug"

import webpack from "./webpack"
import devServer from "./server"

import collection from "../md-collection-loader/cache"
import toStaticHTML from "../static"

export default function(options) {
  const {
    config,
    store,
    exports,
  } = options

  const log = debug("statinamic:builder")
  // JSON.stringify(config, null, 2).split("\n").forEach(l => log(l))

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

      // TODO use a more reliable way to only get entry points
      const assetsFiles = {
        css: [],
        js: [],
      }
      const assets = stats.compilation.assets
      Object.keys(assets).forEach((name) => {
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
          ...collection.map(
            // get url without the base path
            (item) => item.__url.replace(config.baseUrl.pathname, "")
          ),
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
