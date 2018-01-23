import path from "path";
import fs from "fs";
// import url from "url"

// import pkg from "@phenomic/core/package.json"
import findCacheDir from "find-cache-dir";
// import webpack, { BannerPlugin, optimize, DefinePlugin } from "webpack"
import webpack, { BannerPlugin, optimize } from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";

import webpackPromise from "./webpack-promise.js";
import validate from "./validate.js";

const debug = require("debug")("phenomic:plugin:webpack");

const { UglifyJsPlugin } = optimize;
const cacheDir = findCacheDir({ name: "phenomic/webpack", create: true });
const requireSourceMapSupport = `require('${require
  .resolve("source-map-support/register")
  // windows support
  .replace(/\\/g, "/")}');`;

const wrap = JSON.stringify;

const defaultExternals = [
  // we could consider node_modules as externals deps
  // and so use something like
  // /^[A-Za-z0-9-_]/
  // to not bundle all deps in the static build (for perf)
  // the problem is that if people rely on node_modules for stuff
  // like css, this breaks their build.
  //
  // @todo find a better way than a whitelist

  /^emotion(\/.*)?/,
  /^glamor(\/.*)?/,
  /^aphrodite(\/.*)?/,
  /^react-native-web(\/.*)?/,
  /^react-helmet(\/.*)?/
];

const getWebpackConfig = (config: PhenomicConfig) => {
  let webpackConfig;
  const userWebpackConfigPath = path.join(config.path, "webpack.config.js");
  if (fs.existsSync(userWebpackConfigPath)) {
    webpackConfig = require(userWebpackConfigPath)(config);
    debug("webpack.config.js used");
  } else {
    debug("webpack.config.js not found");
    const userWebpackConfigBabelPath = path.join(
      config.path,
      "webpack.config.babel.js"
    );
    if (fs.existsSync(userWebpackConfigBabelPath)) {
      webpackConfig = require(userWebpackConfigBabelPath)(config);
      debug("webpack.config.babel.js used");
    } else {
      debug("webpack.config.babel.js not found");
      webpackConfig = require(path.join(__dirname, "webpack.config.js"))(
        config
      );
      debug("default webpack config used");
    }
  }
  validate(webpackConfig, config);
  debug(webpackConfig);
  return {
    ...webpackConfig,
    plugins: [
      ...(webpackConfig.plugins || []),
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": wrap(process.env.NODE_ENV)
      })
    ]
  };
};

export default function() {
  return {
    name: "@phenomic/plugin-bundler-webpack",
    addDevServerMiddlewares(config: PhenomicConfig) {
      debug("get middlewares");
      const compiler = webpack(getWebpackConfig(config));
      let assets = {};
      compiler.plugin("done", stats => {
        assets = {};
        const namedChunks = stats.compilation.namedChunks;
        Object.keys(namedChunks).forEach(chunkName => {
          const files = namedChunks[chunkName].files.filter(
            file => !file.endsWith(".hot-update.js")
          );
          if (files.length) {
            assets = {
              ...assets,
              [chunkName]: files.shift()
            };
          }
        });
      });
      return [
        (
          req: express$Request,
          res: express$Response,
          next: express$NextFunction
        ) => {
          res.locals.assets = assets;
          next();
        },
        webpackDevMiddleware(compiler, {
          stats: { chunkModules: false, assets: false }
          // @todo add this and output ourself a nice message for build status
          // noInfo: true,
          // quiet: true,
        }),
        webpackHotMiddleware(compiler, {
          reload: true
          // skip hot middleware logs if !verbose
          // log: config.verbose ? undefined : () => {},
        })
      ];
    },
    buildForPrerendering(config: PhenomicConfig) {
      debug("build for prerendering");
      const webpackConfig = getWebpackConfig(config);
      const specialConfig = {
        ...webpackConfig,
        // only keep the entry we are going to use
        entry: {
          [config.bundleName]: webpackConfig.entry[config.bundleName]
        },
        // adjust some config details to be node focused
        target: "node",
        // externals for package/relative name
        externals: [...(webpackConfig.externals || defaultExternals)],
        output: {
          publicPath: "/", // @todo make this dynamic
          path: cacheDir,
          filename: "[name].js",
          library: "app",
          libraryTarget: "commonjs2"
        },
        plugins: [
          // Remove UglifyJSPlugin from plugin stack
          ...(webpackConfig.plugins
            ? webpackConfig.plugins.filter(
                plugin => !(plugin instanceof UglifyJsPlugin)
              )
            : []),
          // sourcemaps
          new BannerPlugin({
            banner: requireSourceMapSupport,
            raw: true,
            entryOnly: false
          })
        ],
        // sourcemaps
        devtool: "#source-map"
      };
      return webpackPromise(specialConfig).then(
        () => require(path.join(cacheDir, config.bundleName)).default
      );
    },
    build(config: PhenomicConfig) {
      debug("build");
      return webpackPromise(getWebpackConfig(config)).then(
        stats => stats.toJson().assetsByChunkName
      );
    }
  };
}
