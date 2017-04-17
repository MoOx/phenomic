import path from "path"

import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"

module.exports = (/* config: PhenomicConfig */) => ({
  entry: {
    bundle: "./App.js",
  },
  output: {
    publicPath: "/",
    path: path.join(process.cwd(), "dist"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: require.resolve("babel-loader"),
        options: {
          babelrc: false,
          presets: [ require.resolve("babel-preset-react-app") ],
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          fallback: require.resolve("style-loader"),
          use: require.resolve("css-loader"),
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({ filename: "styles.css" }),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    }),
    process.env.NODE_ENV === "production" && new webpack.optimize.UglifyJsPlugin(),
  ].filter(item => item),

  resolve: {
    alias: {
      // because it's cool
      "react-native": "react-native-web",

      // to ensure a single module is used
      "react": path.resolve(path.join(process.cwd(), "node_modules", "react")),
      "react-dom": path.resolve(path.join(process.cwd(), "node_modules", "react-dom")),
      "react-router": path.resolve(path.join(process.cwd(), "node_modules", "react-router")),
    },
  },

  // eslint-disable-next-line max-len
  // https://github.com/facebookincubator/create-react-app/blob/fbdff9d722d6ce669a090138022c4d3536ae95bb/packages/react-scripts/config/webpack.config.prod.js#L279-L285
  node: {
    fs: "empty",
    net: "empty",
    tls: "empty",
  },
})
