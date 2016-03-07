import path from "path"

import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"

export default ({ config, pkg }) => ({
  ...config.dev && {
    devtool: "cheap-module-eval-source-map",
  },
  module: {
    loaders: [
      { // statinamic requirement
        test: /\.md$/,
        loader: "statinamic/lib/content-loader",
        query: {
          context: path.join(config.cwd, config.source),
          // renderer: (text) => html
          feedsOptions: {
            title: pkg.name,
            site_url: pkg.homepage,
          },
          feeds: {
            "feed.xml": {
              collectionOptions: {
                filter: { layout: "Post" },
                sort: "date",
                reverse: true,
                limit: 20,
              },
            },
          },
        },
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader" + (
            "?modules"+
            "&localIdentName=[path][name]--[local]--[hash:base64:5]"
          ) + "!" +
          "postcss-loader",
        ),
      },
      {
        test: /\.(html|ico|jpe?g|png|gif)$/,
        loader: "file-loader" +
          "?name=[path][name].[ext]&context=" +
          path.join(config.cwd, config.source),
      },
      {
        test: /\.svg$/,
        loader: "raw-loader",
      },
    ],
  },

  postcss: () => [
    require("stylelint")(),
    require("postcss-cssnext")({ browsers: "last 2 versions" }),
    require("postcss-browser-reporter")(),
    require("postcss-reporter")(),
  ],

  plugins: [
    new ExtractTextPlugin("[name].[hash].css", { disable: config.dev }),
    new webpack.DefinePlugin({ "process.env": {
      NODE_ENV: JSON.stringify(
        config.production ? "production" : process.env.NODE_ENV
      ),
      CLIENT: true,
      REDUX_DEVTOOLS: Boolean(process.env.REDUX_DEVTOOLS),
      STATINAMIC_PATHNAME: JSON.stringify(process.env.STATINAMIC_PATHNAME),
    } }),
    ...config.production && [
      new webpack.optimize.DedupePlugin(),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      }),
    ],
  ],

  output: {
    path: path.join(config.cwd, config.destination),
    publicPath: config.baseUrl.pathname,
    filename: "[name].[hash].js",
  },

  resolve: {
    extensions: [ ".js", ".json", "" ],
    root: [ path.join(config.cwd, "node_modules") ],
  },
  resolveLoader: { root: [ path.join(config.cwd, "node_modules") ] },
})
