import path from "path"
// import url from "url"

// import pkg from "phenomic/package.json"
import findCacheDir from "find-cache-dir"
// import webpack, { BannerPlugin, optimize, DefinePlugin } from "webpack"
import webpack, { BannerPlugin, optimize } from "webpack"
import webpackDevMiddleware from "webpack-dev-middleware"

import webpackPromise from "./webpack-promise.js"

const debug = require("debug")("phenomic:plugin:webpack")

const { UglifyJsPlugin } = optimize
const cacheDir = findCacheDir({ name: "phenomic/webpack", create: true })
const bundleName = "phenomic.node"
const requireSourceMapSupport = `require('${
  require.resolve("source-map-support/register")
  // windows support
  .replace(/\\/g, "/")
}');`

// const wrap = JSON.stringify

const getWebpackConfig = (config) => {
  const userWebpackConfig = require(path.join(config.path, "webpack.config.js"))
  return {
    ...userWebpackConfig,
    // plugins: [
    //   ...(userWebpackConfig.plugins || []),
    //   new DefinePlugin({ "process.env": {
    //     NODE_ENV: wrap(
    //       config.production
    //       ? "production"
    //       : process.env.NODE_ENV
    //     ),
    //
    //     PHENOMIC_USER_PATHNAME: wrap(process.env.PHENOMIC_USER_PATHNAME),
    //     PHENOMIC_USER_URL: wrap(url.format(config.baseUrl)),
    //     PHENOMIC_NAME: wrap(pkg.name[0].toUpperCase() + pkg.name.slice(1)),
    //     PHENOMIC_VERSION: wrap(pkg.version),
    //     PHENOMIC_HOMEPAGE: wrap(pkg.homepage),
    //     PHENOMIC_REPOSITORY: wrap(pkg.repository),
    //   } }),
    // ],
  }
}

export default function() {
  return {
    name: "phenomic-plugin-bundler-webpack",
    getMiddleware(config: PhenomicConfig) {
      debug("get middleware")
      const compiler = webpack(getWebpackConfig(config))
      return webpackDevMiddleware(compiler, {
        stats: { chunkModules: false, assets: false },
        // @todo add this and output ourself a nice message for build status
        // noInfo: true,
        // quiet: true,
      })
    },
    buildForPrerendering(config: PhenomicConfig) {
      debug("build for prerendering")
      const webpackConfig = getWebpackConfig(config)
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
          // Remove UglifyJSPlugin from plugin stack
          ...webpackConfig.plugins ? webpackConfig.plugins.filter(
            (plugin) => !(plugin instanceof UglifyJsPlugin)
          ) : [],
          // sourcemaps
          new BannerPlugin({
            banner: requireSourceMapSupport,
            raw: true,
            entryOnly: false,
          }),
        ],
        // sourcemaps
        devtool: "#source-map",
      }
      return webpackPromise(specialConfig).then(() => require(path.join(cacheDir, bundleName)).default)
    },
    build(config: PhenomicConfig) {
      debug("build")
      return webpackPromise(getWebpackConfig(config))
    },
  }
}
