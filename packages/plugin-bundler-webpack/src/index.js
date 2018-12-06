// @flow

import path from "path";

import findCacheDir from "find-cache-dir";
import webpack from "webpack";
import webpackDevMiddleware from "webpack-dev-middleware";
import webpackHotMiddleware from "webpack-hot-middleware";
import logger from "@phenomic/core/lib/logger";

import webpackPromise from "./webpack-promise.js";
import getWebpackConfig from "./WebpackGetConfig.js";
import WebpackServerConfigModifier from "./WebpackServerConfigModifier.js";

const debug = require("debug")("phenomic:plugin:bundler-webpack");

const pluginName = "@phenomic/plugin-bundler-webpack";
const log = logger(pluginName);

const cacheDir = findCacheDir({ name: "phenomic/webpack", create: true });

const bundlerWebpack: PhenomicPluginModule<{}> = config => {
  return {
    name: pluginName,
    addDevServerMiddlewares() {
      debug("get middlewares");
      // $FlowFixMe interface sucks
      const compiler = webpack(getWebpackConfig(config));
      let assets = {};
      // $FlowFixMe interface sucks
      compiler.hooks.done.tap(pluginName + "/dev-server-middleware", stats => {
        assets = {};
        const namedChunks = stats.compilation.namedChunks;
        namedChunks.forEach((chunk, chunkName) => {
          const files = chunk.files.filter(
            file => !file.endsWith(".hot-update.js"),
          );
          if (files.length) {
            assets = {
              ...assets,
              [chunkName]: files.shift(),
            };
          }
        });
      });
      return [
        (
          req: express$Request,
          res: express$Response,
          next: express$NextFunction,
        ) => {
          res.locals.assets = assets;
          next();
        },
        webpackDevMiddleware(compiler, {
          logLevel: "warn",
          publicPath: config.baseUrl.pathname,
          stats: {
            chunkModules: false,
            assets: false,
          },
          // logger: log, // output info even if logLevel: "warn"
        }),
        webpackHotMiddleware(compiler, {
          reload: true,
          log,
        }),
      ];
    },
    buildForPrerendering() {
      debug("build for prerendering");
      return webpackPromise(WebpackServerConfigModifier(config, cacheDir)).then(
        // $FlowFixMe no I can't
        () => require(path.join(cacheDir, config.bundleName)).default,
      );
    },
    build() {
      debug("build");
      return webpackPromise(getWebpackConfig(config)).then(
        stats => stats.toJson().assetsByChunkName,
      );
    },
  };
};

export default bundlerWebpack;
