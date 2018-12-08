// @flow

import path from "path";
import fs from "fs";

import webpack from "webpack";

import validate from "./WebpackConfigValidator.js";

const debug = require("debug")("phenomic:plugin:bundler-webpack");

export default (config: PhenomicConfig) => {
  let webpackConfig;
  const userWebpackConfigPath = path.join(config.path, "webpack.config.js");
  if (fs.existsSync(userWebpackConfigPath)) {
    // $FlowFixMe no I can't
    webpackConfig = require(userWebpackConfigPath);
    webpackConfig = (webpackConfig.default
      ? webpackConfig.default
      : webpackConfig)(config);
    debug("webpack.config.js used");
  } else {
    debug("webpack.config.js not found");
    const userWebpackConfigBabelPath = path.join(
      config.path,
      "webpack.config.babel.js",
    );
    if (fs.existsSync(userWebpackConfigBabelPath)) {
      // $FlowFixMe no I can't
      webpackConfig = require(userWebpackConfigBabelPath);
      webpackConfig = (webpackConfig.default
        ? webpackConfig.default
        : webpackConfig)(config);
      debug("webpack.config.babel.js used");
    } else {
      debug("webpack.config.babel.js not found");
      // $FlowFixMe no I can't
      webpackConfig = require(path.join(__dirname, "webpack.config.js"))(
        config,
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
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      }),
    ],
  };
};
