// @flow
import webpack from "webpack";
import logger from "@phenomic/core/lib/logger";

const pluginName = "@phenomic/plugin-bundler-webpack";
const log = logger(pluginName);

export default function(webpackConfig: Object): Promise<any> {
  return new Promise((resolve, reject) => {
    // $FlowFixMe interface sucks
    webpack(webpackConfig).run((err, stats) => {
      if (err) {
        reject(err);
      }

      if (stats.hasWarnings()) {
        log.warn(stats.toString(webpackConfig.stats).trim());
      }

      if (stats.hasErrors()) {
        log.error(stats.toString(webpackConfig.stats).trim());
        reject("webpack build failed with errors");
      }

      resolve(stats);
    });
  });
}
