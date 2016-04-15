// @flow
import { join } from "path"
import fs from "fs-extra"
import color from "chalk"
import debug from "debug"

import webpack from "./webpack"
import sortAssets from "./webpack/sortAssets"
import devServer from "./server"

import collection from "../content-loader/cache"
import toStaticHTML from "../static"

export default function(options: Object): void {
  const {
    config,
    store,
    exports,
  } = options

  const log = debug("phenomic:builder")

  const destination = join(config.cwd, config.destination)
  fs.emptyDirSync(destination)

  if (config.static) {
    // Copy static assets to build folder
    if (config.assets) {
      const copyDest = join(destination, config.assets.route)
      fs.copySync(config.assets.path, copyDest)
      log(color.green("✓ Static assets: copy static assets completed"))
    }

    webpack(config.webpackConfigClient, log, (stats) => {
      log(color.green("✓ Static assets: client build completed"))

      const assetsFiles = sortAssets(stats.toJson().assetsByChunkName)

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
          devServer({ config })
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
    devServer({
      config,
      exports,
      store,
    })
  }
  else {
    throw new Error("You need to specify --static or --server")
  }
}
