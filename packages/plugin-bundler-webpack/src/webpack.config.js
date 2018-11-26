// @flow

import path from "path";

import getClientEnvironment from "@phenomic/core/lib/configuration/get-client-environment.js";
import webpack from "webpack";
// $FlowFixMe lazy me
import MiniCssExtractPlugin from "mini-css-extract-plugin";

module.exports = (config: PhenomicConfig) => ({
  mode: process.env.NODE_ENV,
  entry: {
    [config.bundleName]: [
      process.env.PHENOMIC_ENV !== "static" &&
        require.resolve("webpack-hot-middleware/client"),
      path.join(config.path, "App.js"),
    ].filter(item => item),
  },
  output: {
    publicPath: config.baseUrl.pathname,
    path: path.isAbsolute(config.outdir)
      ? config.outdir
      : path.join(config.path, config.outdir),
    ...(process.env.PHENOMIC_ENV !== "static"
      ? {
          filename: "phenomic/[name].js",
          chunkFilename: "phenomic/[name].chunk.js",
        }
      : {
          filename: "phenomic/[name].[chunkhash:8].js",
          chunkFilename: "phenomic/[name].[chunkhash:8].chunk.js",
        }),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("babel-loader"),
            options: {
              babelrc: false,
              presets: [require.resolve("@phenomic/babel-preset")],
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [
          process.env.PHENOMIC_ENV !== "static"
            ? "style-loader"
            : MiniCssExtractPlugin.loader,
          require.resolve("css-loader"),
        ],
      },
    ],
  },
  plugins: [
    process.env.PHENOMIC_ENV === "static" &&
      new MiniCssExtractPlugin({
        filename: "phenomic/[name].[chunkhash:8].css",
        chunkFilename: "phenomic/[name].[chunkhash:8].chunk.css",
      }),
    (() => {
      const envVars = getClientEnvironment(config);
      return new webpack.DefinePlugin({
        "process.env": Object.keys(envVars).reduce((env, key) => {
          env[key] = JSON.stringify(envVars[key]);
          return env;
        }, {}),
      });
    })(),
    process.env.PHENOMIC_ENV !== "static" &&
      new webpack.HotModuleReplacementPlugin(),
  ].filter(item => item),

  resolve: {
    // react-native(-web) | react-primitives
    extensions: [".web.js", ".js", ".json"],
  },

  // eslint-disable-next-line max-len
  // https://github.com/facebookincubator/create-react-app/blob/fbdff9d722d6ce669a090138022c4d3536ae95bb/packages/react-scripts/config/webpack.config.prod.js#L279-L285
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  },
});
