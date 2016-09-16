// @flow
import { join } from "path"
import fs from "fs-extra"
import colors from "chalk"

import log from "../_utils/log"

import webpack from "./webpack"
import sortAssets from "./webpack/sortAssets.js"
import devServer from "./server.js"
import postBuild from "./post-build.js"

import webpackConfigBrowser from "./webpack/config.browser.js"
import webpackConfigNode, { cacheDir } from "./webpack/config.node.js"
import dynamicRequire from "./dynamic-require.js"

import PhenomicLoaderWebpackPlugin from "../loader/plugin.js"

export default function(config: Object): void {
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

  const env = process.env.NODE_ENV || "development"
  process.env.BABEL_ENV = "webpack-" + env

  if (config.static) {
    // Copy static assets to build folder
    if (config.assets) {
      log("Copying assets", () => {
        const copyDest = join(destination, config.assets.route)
        fs.copySync(config.assets.path, copyDest)
      })
    }

    const webpackPromise = (webpackConfig): Promise<any> => (
      new Promise((resolve: Function, reject: Function) => {
        try {
          webpack(webpackConfig, log, resolve)
        }
        catch (e) {
          reject(e)
        }
      })
    )

    log("Building client files", webpackPromise(config.webpackConfigBrowser))
    .then((clientBundleStats) => (
      log("Preparing static build", webpackPromise(config.webpackConfigNode))
      .then(() => clientBundleStats)
    ))
    .then((clientBundleStats) => log("Building static files", () => (
      dynamicRequire(join(
        config.webpackConfigNode.output.path,
        config.webpackConfigNode.output.filename
      ))({
        ...config,
        collection: PhenomicLoaderWebpackPlugin.collection,
        assetsFiles: sortAssets(
          clientBundleStats.toJson().assetsByChunkName
        ),
      })
    )))
    .then((files) => postBuild(config, files))
    .then(() => config.server && devServer(config))
    .catch((err) => {
      log(colors.red("Build failed"), "error")
      setTimeout(() => {

        // improve Error
        const cleanPathRE = new RegExp(cacheDir + "\/(webpack:\/)?", "g")
        err.message = "\n\n" + colors.red(err.message) + "\n"
        err.stack = err.stack.replace(cleanPathRE, "")

        throw err
      }, 1)
    })
  }
  else if (config.server) {
    devServer(config)
  }
  else {
    console.error(colors.red(
      "phenomic: CLI needs --static or --server"
    ))
  }
}
