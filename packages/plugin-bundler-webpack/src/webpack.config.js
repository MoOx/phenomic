import path from "path";

import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";

const isStatic = process.env.PHENOMIC_ENV === "static";
const isProduction = process.env.NODE_ENV === "production";

const baseConfig = require("react-scripts/config/webpack.config." +
  (isProduction ? "prod" : "dev"));

module.exports = (config: PhenomicConfig) => ({
  ...baseConfig,
  entry: {
    [config.bundleName]: [
      !isStatic && require.resolve("webpack-hot-middleware/client"),
      !isStatic && require.resolve("react-hot-loader/patch"),
      "./App.js"
    ].filter(item => item)
  },
  output: {
    ...baseConfig.output,
    path: path.isAbsolute(config.outdir)
      ? config.outdir
      : path.join(process.cwd(), config.outdir),
    ...(!isStatic
      ? {
          filename: "phenomic/[name].js",
          chunkFilename: "phenomic/[name].chunk.js"
        }
      : {
          filename: "phenomic/[name].[chunkhash:8].js",
          chunkFilename: "phenomic/[name].[chunkhash:8].chunk.js"
        })
  },
  module: {
    ...baseConfig.module,
    rules: baseConfig.module.rules.map(rule => {
      if (rule.oneOf) {
        return {
          oneOf: rule.oneOf.map(rule => {
            if (rule.loader === require.resolve("babel-loader")) {
              return {
                ...rule,
                include: process.cwd(),
                exclude: /node_modules/,
                options: {
                  ...rule.options,
                  presets: ["@phenomic/babel-preset"],
                  plugins: ["react-hot-loader/babel"]
                }
              };
            }

            return rule;
          })
        };
      }

      return rule;
    })
  },
  plugins: baseConfig.plugins.map(plugin => {
    if (plugin instanceof ExtractTextPlugin) {
      return new ExtractTextPlugin({
        filename: "phenomic/[name].[contenthash:8].css",
        disable: !isStatic
      });
    }
  })
});
