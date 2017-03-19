import path from "path"

import findCacheDir from "find-cache-dir"
import webpack, { BannerPlugin, optimize } from "webpack"
import webpackDevMiddleware from "webpack-dev-middleware"

const debug = require("debug")("phenomic:plugin:webpack")

const { UglifyJsPlugin } = optimize
const cacheDir = findCacheDir({ name: "phenomic/webpack", create: true })
const bundleName = "phenomic.node"
const requireSourceMapSupport = `require('${
  require.resolve("source-map-support/register")
  // windows support
  .replace(/\\/g, "/")
}');`

export default function() {
  return {
    name: "phenomic-plugin-bundler-webpack",
    type: "bundler",
    getMiddleware(config) {
      debug("get middleware")
      const compiler = webpack(getWebpackConfig(config))
      return webpackDevMiddleware(compiler, {
        stats: { chunkModules: false, assets: false },
        // @todo add this and output ourself a nice message for build status
        // noInfo: true,
        // quiet: true,
      })
    },
    buildForPrerendering(config) {
      debug("build for prerendering")
      const webpackConfig = require(path.join(config.path, "webpack.config.js"))
      const specialConfig = {
        ...webpackConfig,
        target: "node",
        entry: {
          [bundleName]: path.join(config.path, "App.js"),
        },
        output: {
          publicPath: "/",
          path: cacheDir,
          filename: "[name].js",
          library: "app",
          libraryTarget: "commonjs2",
        },
        plugins: [
          ...webpackConfig.plugins ? webpackConfig.plugins : [],
          // Remove UglifyJSPlugin from plugin stack
          ...webpackConfig.plugins.filter(
            (plugin) => !(plugin instanceof UglifyJsPlugin)
          ) || [],
          // sourcemaps
          new BannerPlugin(
            requireSourceMapSupport,
            { raw: true, entryOnly: false }
          ),
        ],
        // sourcemaps
        devtool: "#source-map",
      }
      return new Promise((resolve, reject) => {
        webpack(specialConfig).run(function(error /* , stats*/) {
          error
          ? reject(error)
          : resolve(require(path.join(cacheDir, bundleName)))
        })
      })
    },
    build(config) {
      debug("build")
      const webpackConfig = require(path.join(config.path, "webpack.config.js"))
      return new Promise((resolve, reject) => {
        webpack(webpackConfig).run(function(error /* , stats */) {
          error
          ? reject(error)
          : resolve()
        })
      })
    },
  }
}
