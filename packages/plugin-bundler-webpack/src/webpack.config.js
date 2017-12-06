import path from "path";

import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";
import autoprefixer from "autoprefixer";

module.exports = (config: PhenomicConfig) => {
  const isStatic = process.env.PHENOMIC_ENV === "static";
  const isProduction = process.env.NODE_ENV === "production";

  const baseConfig = require("react-scripts/config/webpack.config." +
    (isProduction ? "prod" : "dev"));

  return {
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
      publicPath: "/",
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

              if (rule.test && rule.test.toString() === "/\\.css$/") {
                return {
                  ...rule,
                  loader: ExtractTextPlugin.extract({
                    fallback: {
                      loader: require.resolve("style-loader"),
                      options: {
                        hmr: !isStatic
                      }
                    },
                    use: [
                      {
                        loader: require.resolve("css-loader"),
                        options: {
                          importLoaders: 1,
                          minimize: isProduction,
                          sourcemap: true
                        }
                      },
                      {
                        loader: require.resolve("postcss-loader"),
                        options: {
                          ident: "postcss",
                          plugins: () => [
                            require("postcss-flexbugs-fixes"),
                            autoprefixer({
                              browsers: [
                                ">1%",
                                "last 4 versions",
                                "Firefox ESR",
                                "not ie < 9"
                              ],
                              flexbox: "no-2009"
                            })
                          ]
                        }
                      }
                    ]
                  })
                };
              }

              return rule;
            })
          };
        }

        return rule;
      })
    },
    plugins: baseConfig.plugins
      .map(plugin => {
        if (plugin instanceof ExtractTextPlugin) {
          return new ExtractTextPlugin({
            filename: "phenomic/[name].[contenthash:8].css",
            disable: !isStatic
          });
        }

        if (plugin instanceof HtmlWebpackPlugin) {
          return null;
        }

        return plugin;
      })
      .filter(Boolean)
  };
};
