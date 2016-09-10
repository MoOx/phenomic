import path from "path"

import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"
import { phenomicLoader } from "phenomic"

import pkg from "./package.json"

// note that this webpack file is exporting a "makeConfig" function
// which is used for phenomic to build dynamic configuration based on your needs
// see the end of the file if you want to export a default config
// (eg: if you share your config for phenomic and other stuff)
export const makeConfig = (config = {}) => {
  return {
    ...config.dev && {
      devtool: "#cheap-module-eval-source-map",
    },
    module: {
      noParse: /\.min\.js/,
      loaders: [
        {
          // phenomic requirement
          test: /\.md$/,
          loader: phenomicLoader,
          // config is in phenomic.phenomicLoader section below
          // so you can use functions (and not just JSON) due to a restriction
          // of webpack that serialize/deserialize loader `query` option.
        },
        {
          test: /\.json$/,
          loader: "json-loader",
        },
        {
          test: /\.js$/,
          include: [
            path.resolve(__dirname, "scripts"),
            path.resolve(__dirname, "src"),
          ],
          loaders: [
            "babel-loader?cacheDirectory=true",
            "eslint-loader?fix",
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.global\.css$/,
          include: path.resolve(__dirname, "src"),
          loader: ExtractTextPlugin.extract({
            fallbackLoader: "style-loader",
            loader: [
              `css-loader?modules&localIdentName=${
                config.production
                ? "[hash:base64:5]"
                : "[path][name]--[local]--[hash:base64:5]"
              }`,
              "postcss-loader",
            ],
          }),
        },
        {
          test: /\.global\.css$/,
          include: path.resolve(__dirname, "src"),
          loader: ExtractTextPlugin.extract({
            fallbackLoader: "style-loader",
            loader: [ "css-loader", "postcss-loader" ],
          }),
        },
        {
          test: /\.(html|ico|jpe?g|png|gif)$/,
          loader: "file-loader" +
            "?name=[path][name].[hash].[ext]&context=" +
            path.join(__dirname, config.source),
        },
        {
          test: /\.svg$/,
          loader: "raw-loader",
        },
      ],
    },

    phenomic: {
      context: path.join(__dirname, config.source),
      // plugins: [ ...require("phenomic/lib/loader-preset-markdown").default ]
      // see https://phenomic.io/docs/usage/plugins/
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

    postcss: () => [
      require("stylelint")(),
      require("postcss-cssnext")({ browsers: "last 2 versions" }),
      require("postcss-reporter")(),
      ...!config.production ? [
        require("postcss-browser-reporter")(),
      ] : [],
    ],

    plugins: [
      new ExtractTextPlugin({
        filename: "[name].[hash].css",
        disable: config.dev,
      }),

      ...config.production && [
        // DedupePlugin does not work correctly with Webpack 2, yet ;)
        // https://github.com/webpack/webpack/issues/2644
        // new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(
          { compress: { warnings: false } }
        ),
      ],
    ],

    output: {
      path: path.join(__dirname, config.destination),
      publicPath: config.baseUrl.pathname,
      filename: "[name].[hash].js",
    },

    resolve: {
      extensions: [ ".js", ".json", "" ],
      root: [ path.join(__dirname, "node_modules") ],
    },
    resolveLoader: { root: [ path.join(__dirname, "node_modules") ] },
  }
}

// you might want to export a default config for another usage ?
// export default makeConfig()
