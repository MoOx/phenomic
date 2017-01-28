// @flow
import { join } from "path"

import fs from "fs-extra"
import colors from "chalk"

import log from "../_utils/log"
import errorFormatter from "../_utils/error-formatter"
import webpackVersion from "../_utils/webpack-version"
// module.exports is used
// eslint-disable-next-line import/default
import PhenomicLoaderWebpackPlugin from "../loader/plugin.js"

import webpack from "./webpack"
import sortAssets from "./webpack/sortAssets.js"
import devServer from "./server.js"
import postBuild from "./post-build.js"
import webpackConfigBrowser from "./webpack/config.browser.js"
import webpackConfigNode from "./webpack/config.node.js"
import dynamicRequire from "./dynamic-require.js"

export default function(config: Object): void {
  // log(JSON.stringify(config, null, 2))

  const makeWebpackConfigModule = dynamicRequire(
    join(config.cwd, config["webpackConfig"])
  )
  const makeWebpackConfig =
    typeof makeWebpackConfigModule.default === "function"
    ? makeWebpackConfigModule.default
    // : makeWebpackConfigModule
    // @todo remove block below and uncomment line above
    : typeof makeWebpackConfigModule === "function"
    ? makeWebpackConfigModule
    // deprecated
    : makeWebpackConfigModule.makeConfig

  if (webpackVersion() === 2 && makeWebpackConfigModule.makeConfig) {
    log(
      "Your webpack config should now directly export a function.\n" +
      "No need to export a makeConfig() function anymore as webpack@2 " +
      "natively support a function. " +
      "(makeConfig() is currently deprecated and support will be remove in a " +
      "futur release). ",
      "warning"
    )
  }

  if (typeof makeWebpackConfig !== "function") {
    throw new Error(
      "Your webpack config must export a function. " +
      "This function will be called with a single argument " +
      "(Phenomic configuration object) and must return a valid webpack config."
    )
  }

  config.webpackConfig = makeWebpackConfig(config)
  config.webpackConfigBrowser = webpackConfigBrowser(config)
  config.webpackConfigNode = webpackConfigNode(config)

  const destination = join(config.cwd, config.destination)
  fs.emptyDirSync(destination)

  if (webpackVersion() === 2) {
    const env = process.env.NODE_ENV || "development"
    process.env.BABEL_ENV = "webpack-" + env
  }

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
    .then((clientBundleStats) => {
      // Sometimes, webpack does not throw an error, but send it in the
      // callback... PRETTY WEIRD RIGHT?
      // https://github.com/webpack/webpack/issues/2217#issuecomment-249364851
      if (clientBundleStats instanceof Error) {
        throw clientBundleStats
      }
      return (
        log(
          "Preparing static build",
          webpackPromise(config.webpackConfigNode)
        )
        .then(() => clientBundleStats)
      )
    })
    .then((clientBundleStats) => log("Building static files", () => {
      const staticBuild = dynamicRequire(join(
        config.webpackConfigNode.output.path,
        config.webpackConfigNode.output.filename
      ))
      // transpilation shit
      // https://github.com/webpack/webpack/issues/4039
      return (
        (typeof staticBuild.default === "function")
        ? staticBuild.default
        : staticBuild
      )({
        ...config,
        collection: PhenomicLoaderWebpackPlugin.collection,
        assetsFiles: sortAssets(
          clientBundleStats.toJson().assetsByChunkName
        ),
      })
    }))
    .then((files) => postBuild(config, files))
    .then(() => config.server && devServer(config))
    .catch((err) => {
      log(colors.red("Build failed"), "error")
      setTimeout(() => {
        throw errorFormatter(err)
      }, 1)
    })
  }
  else if (config.server) {
    devServer(config)
  }
  else {
    throw new Error(colors.red(
      "phenomic: CLI needs --static or --server"
    ))
  }
}
