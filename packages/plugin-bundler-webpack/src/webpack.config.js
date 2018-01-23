import path from "path";

import webpack from "webpack";
import ExtractTextPlugin from "extract-text-webpack-plugin";

module.exports = (config: PhenomicConfig) => ({
  entry: {
    [config.bundleName]: [
      process.env.PHENOMIC_ENV !== "static" &&
        require.resolve("webpack-hot-middleware/client"),
      process.env.PHENOMIC_ENV !== "static" &&
        require.resolve("react-hot-loader/patch"),
      "./App.js"
    ].filter(item => item)
  },
  output: {
    publicPath: "/", // @todo make this dynamic
    path: path.isAbsolute(config.outdir)
      ? config.outdir
      : path.join(process.cwd(), config.outdir),
    ...(process.env.PHENOMIC_ENV !== "static"
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
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
        options: {
          babelrc: false,
          presets: [require.resolve("@phenomic/babel-preset")],
          plugins: [require.resolve("react-hot-loader/babel")]
        }
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: require.resolve("style-loader"),
          use: require.resolve("css-loader")
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: "phenomic/[name].[contenthash:8].css",
      disable: process.env.PHENOMIC_ENV !== "static"
    }),
    process.env.PHENOMIC_ENV !== "static" &&
      new webpack.HotModuleReplacementPlugin(),
    process.env.NODE_ENV === "production" &&
      new webpack.optimize.UglifyJsPlugin()
  ].filter(item => item),

  resolve: {
    // react-native(-web) | react-primitives
    extensions: [".web.js", ".js", ".json"]
  },

  // eslint-disable-next-line max-len
  // https://github.com/facebookincubator/create-react-app/blob/fbdff9d722d6ce669a090138022c4d3536ae95bb/packages/react-scripts/config/webpack.config.prod.js#L279-L285
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty"
  }
});
