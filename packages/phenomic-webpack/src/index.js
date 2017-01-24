import path from "path"

import findCacheDir from "find-cache-dir"
import webpack from "webpack"
import webpackDevMiddleware from "webpack-dev-middleware"

const bundleName = "phenomic.node"
const cacheDir = findCacheDir({ name: "phenomic/webpack", create: true })

export default function() {
  return {
    getMiddleware(config) {
      const webpackConfig = require(path.join(config.path, "webpack.config.js"))
      const compiler = webpack(webpackConfig)
      return webpackDevMiddleware(compiler)
    },
    buildForPrerendering(config) {
      const webpackConfig = require(path.join(config.path, "webpack.config.js"))
      const specialConfig = {
        ...webpackConfig,
        entry: {
          [bundleName]: path.join(config.path, "App.js"),
        },
        output: {
          publicPath: "/",
          path: cacheDir,
          filename: "[name].js",
          target: "node",
          library: "app",
          libraryTarget: "commonjs2",
        },
      }
      return new Promise((resolve, reject) => {
        webpack(specialConfig).run(function(error /* , stats*/) {
          if (error) {
            console.error(error)
            reject(error)
          }
          else {
            resolve(require(path.join(cacheDir, bundleName)))
          }
        })
      })
    },
    build(config) {
      const webpackConfig = require(path.join(config.path, "webpack.config.js"))
      return new Promise((resolve, reject) => {
        webpack(webpackConfig).run(function(error /* , stats */) {
          if (error) {
            reject(error)
          }
          else {
            resolve()
          }
        })
      })
    },
  }
}
