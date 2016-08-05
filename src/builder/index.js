// @flow
import { join } from "path"
import fs from "fs-extra"
import color from "chalk"
import debug from "debug"

import webpack from "./webpack"
import sortAssets from "./webpack/sortAssets"
import devServer from "./server"

import collection from "../phenomic-loader/cache"

import webpackConfigBrowser from "./webpack/config.browser.js"
import webpackConfigNode from "./webpack/config.node.js"
import dynamicRequire from "./dynamic-require.js"

export default function(config: Object): void {
  const log = debug("phenomic:builder")
  // log(JSON.stringify(config, null, 2))

  const makeWebpackConfig = dynamicRequire(
    join(config.cwd, config["webpack-config"])
  ).makeConfig

  if (typeof makeWebpackConfig !== "function") {
    throw new Error(
      "Your webpack config must expose a 'makeConfig' function. " +
      "This function will be called with a single argument " +
      "(Phenomic configuration object) and must return a valid webpack config."
    )
  }

  config.webpackConfig = makeWebpackConfig(config)
  config.webpackConfigBrowser = webpackConfigBrowser(config)
  config.webpackConfigNode = webpackConfigNode(config)

  const destination = join(config.cwd, config.destination)
  fs.emptyDirSync(destination)

  if (config.static) {
    // Copy static assets to build folder
    if (config.assets) {
      const copyDest = join(destination, config.assets.route)
      fs.copySync(config.assets.path, copyDest)
      log(color.green("✓ Static build: assets copy completed"))
    }

    webpack(config.webpackConfigBrowser, log, (stats) => {
      log(color.green("✓ Static build: client build completed"))

      const assetsFiles = sortAssets(stats.toJson().assetsByChunkName)

      webpack(config.webpackConfigNode, log, () => {
        log(color.green("✓ Static build: static build completed"))
        dynamicRequire(join(
          config.webpackConfigNode.output.path,
          config.webpackConfigNode.output.filename
        ))({
          ...config,
          collection,
          assetsFiles,
          urls: collection.map((item) => item.__url),
        })
        .then(() => {
          if (config.server) {
            devServer(config)
          }
        })
        .catch((error) => {
          log(color.red("✗ Faild to start static server"))
          setTimeout(() => {
            throw error
          }, 1)
        })
      })
    })
  }
  else if (config.server) {
    devServer(config)
  }
  else {
    throw new Error("You need to specify --static or --server")
  }
}
