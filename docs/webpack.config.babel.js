import path from "path"

import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"
import { phenomicLoader } from "phenomic"
import PhenomicLoaderFeedWebpackPlugin
  from "phenomic/lib/loader-feed-webpack-plugin"
/**
 * WARNING: this config is super ultra cool as it support both webpack 1 & 2
 */
import webpackVersion from "phenomic/lib/_utils/webpack-version"

import pkg from "./package.json"

export default (config = {}) => {
  const postcssPlugins = () => [
    require("stylelint")(),
    require("postcss-cssnext")({ browsers: "last 2 versions" }),
    require("postcss-reporter")(),
    ...!config.production ? [
      require("postcss-browser-reporter")(),
    ] : [],
  ]

  return {
    ...config.dev && {
      devtool: "#cheap-module-eval-source-map",
    },
    module: {
      noParse: /\.min\.js/,
      [webpackVersion() === 1 ? "loaders" : "rules"]: [
        {
          // phenomic requirement
          test: /\.md$/,
          loader: phenomicLoader,
          ...(
            webpackVersion() === 1
            ? { /* see below in global section */ }
            : {
              query: {
                context: path.join(__dirname, config.source),
                // plugins: [
                //   ...require("phenomic/lib/loader-preset-markdown").default
                // ]
                // see https://phenomic.io/docs/usage/plugins/
              },
            }
          ),
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
            // cacheDirectory could be used in production
            // but since we switch between webpack 1 & 2 (and babel config)
            // this is causing issues
            "babel-loader", // ?cacheDirectory,
            "eslint-loader?fix" + (config.dev ? "&emitWarning" : ""),
          ],
        },
        {
          test: /\.css$/,
          exclude: /\.global\.css$/,
          include: path.resolve(__dirname, "src"),
          loader: (
            webpackVersion() === 1
            ? (
              ExtractTextPlugin.extract(
                "style-loader",
                [ `css-loader?modules&localIdentName=${
                  config.production
                  ? "[hash:base64:5]"
                  : "[path][name]--[local]--[hash:base64:5]"
                  }`,
                  "postcss-loader",
                ].join("!"),
              )
            )
            : (
              ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: [
                  {
                    loader: "css-loader",
                    query: {
                      modules: true,
                      localIdentName: (
                          config.production
                          ? "[hash:base64:5]"
                          : "[path][name]--[local]--[hash:base64:5]"
                        ),
                    },
                  },
                  {
                    loader: "postcss-loader",
                    // query for postcss can't be used right now
                    // https://github.com/postcss/postcss-loader/issues/99
                    // meanwhile, see webpack.LoaderOptionsPlugin in "plugins"
                    // query: { plugins: postcssPlugins },
                  },
                ],
              })
            )
          ),
        },
        {
          test: /\.global\.css$/,
          include: path.resolve(__dirname, "src"),
          loader: (
            webpackVersion() === 1
            ? (
              ExtractTextPlugin.extract(
                "style-loader",
                [ "css-loader", "postcss-loader" ].join("!"),
              )
            )
            : (
              ExtractTextPlugin.extract({
                fallbackLoader: "style-loader",
                loader: [
                  "css-loader",
                  {
                    loader: "postcss-loader",
                    // query for postcss can't be used right now
                    // https://github.com/postcss/postcss-loader/issues/99
                    // meanwhile, see webpack.LoaderOptionsPlugin in "plugins"
                    // query: { plugins: postcssPlugins },
                  },
                ],
              })
            )
          ),
        },
        {
          test: /\.(html|ico|jpe?g|png|gif)$/,
          loader: "file-loader",
          query: {
            name: "[path][name].[hash].[ext]",
            context: path.join(__dirname, config.source),
          },
        },
        {
          test: /\.svg$/,
          loader: "raw-loader",
        },
      ],
    },

    ...(
      webpackVersion() === 1
      ? {
        postcss: postcssPlugins,
        phenomic: {
          context: path.join(__dirname, config.source),
          // plugins: [
          //   ...require("phenomic/lib/loader-preset-markdown").default
          // ]
          // see https://phenomic.io/docs/usage/plugins/
        },
      }
      : {}
    ),

    plugins: [
      ...(
        webpackVersion() === 1
        ? []
        : [
          // You should be able to remove the block below when the following
          // issue has been correctly handled (and postcss-loader supports
          // "plugins" option directly in query, see postcss-loader usage above)
          // https://github.com/postcss/postcss-loader/issues/99
          new webpack.LoaderOptionsPlugin({
            test: /\.css$/,
            options: {
              postcss: postcssPlugins,
              // required to avoid issue css-loader?modules
              // this is normally the default value, but when we use
              // LoaderOptionsPlugin, we must specify it again, otherwise,
              // context is missing (and css modules names can be broken)!
              context: __dirname,
            },
          }),
        ]
      ),

      new PhenomicLoaderFeedWebpackPlugin({
        // here you define generic metadata for your feed
        feedsOptions: {
          title: pkg.name,
          site_url: pkg.homepage,
        },
        feeds: {
          // here we define one feed, but you can generate multiple, based
          // on different filters
          "feed.xml": {
            collectionOptions: {
              filter: { layout: "Post" },
              sort: "date",
              reverse: true,
              limit: 20,
            },
          },
        },
      }),

      ...(
        webpackVersion() === 1
        ? [
          new ExtractTextPlugin("[name].[hash].css", { disable: config.dev }),
        ]
        : [
          new ExtractTextPlugin({
            filename: "[name].[hash].css",
            disable: config.dev,
          }),
        ]
      ),

      ...config.production && [
        // DedupePlugin does not work correctly with Webpack 2, yet ;)
        // https://github.com/webpack/webpack/issues/2644
        ...(
          webpackVersion() === 1
          ? [ new webpack.optimize.DedupePlugin() ]
          : []
        ),

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

    ...(
      webpackVersion() === 1
      ? {
        resolve: {
          extensions: [ ".js", ".json", "" ],
          root: [ path.join(__dirname, "node_modules") ],
        },
        resolveLoader: { root: [ path.join(__dirname, "node_modules") ] },
      }
      : {
        resolve: { extensions: [ ".js", ".json" ] },
      }
    ),
  }
}
