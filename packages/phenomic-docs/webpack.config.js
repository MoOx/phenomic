const path = require("path")
const webpack = require("webpack")
const ExtractTextPlugin = require("extract-text-webpack-plugin")

module.exports = {
  entry: {
    bundle: "./App.js",
  },
  output: {
    publicPath: "/",
    path: path.join(process.cwd(), "dist"),
    filename: "[name].js",
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel",
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract("style", "css"),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin("styles.css"),
    new webpack.DefinePlugin({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV || "development"),
    }),
    process.env.NODE_ENV === "production" && new webpack.optimize.OccurrenceOrderPlugin(),
    process.env.NODE_ENV === "production" && new webpack.optimize.UglifyJsPlugin(),
  ].filter(item => item),
  resolve: {
    alias: {
      "react-native": "react-native-web",
      "react": path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
      "react-router": path.resolve("./node_modules/react-router"),
    },
  },
}
