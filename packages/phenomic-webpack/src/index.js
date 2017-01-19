const webpack = require("webpack")
const webpackDevMiddleware = require("webpack-dev-middleware")
const path = require("path")

module.exports = function() {
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
          bundle: path.join(config.path, "App.js"),
        },
        output: {
          publicPath: "/",
          path: path.join(process.cwd(), ".tmp/webpack"),
          filename: "[name].js",
          target: "node",
          library: "app",
          libraryTarget: "commonjs2",
        },
      }
      return new Promise((resolve, reject) => {
        webpack(specialConfig).run(function(error, stats) {
          if (error) {
            console.error(error)
            reject(error)
          }
          else {
            resolve(require(path.join(process.cwd(), ".tmp/webpack/bundle")))
          }
        })
      })
    },
    build(config) {
      const webpackConfig = require(path.join(config.path, "webpack.config.js"))
      return new Promise((resolve, reject) => {
        webpack(webpackConfig).run(function(error, stats) {
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
