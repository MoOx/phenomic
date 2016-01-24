import fs from "fs"
import path from "path"
import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"

import markdownIt from "markdown-it"
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor"
import hljs from "highlight.js"

import pkg from "../package.json"

import builder from "statinamic/lib/builder"
import configurator from "statinamic/lib/configurator"
import prepareDefinedValues from "statinamic/lib/prepare-defined-values"

const config = configurator(pkg)

const webpackConfig = {
  output: {
    path: path.join(config.cwd, config.destination),
    filename: "[name].js",
    publicPath: config.baseUrl.path,
  },

  resolve: {
    extensions: [
      // node default extensions
      ".js",
      ".json",
      // for all other extensions specified directly
      "",
    ],

    root: [ path.join(config.cwd, "node_modules") ],
  },

  resolveLoader: {
    root: [ path.join(config.cwd, "node_modules") ],
  },

  module: {
    // ! \\ note that loaders are executed from bottom to top !
    loaders: [
      //
      // statinamic requirement
      //
      {
        test: /\.md$/,
        loader: "statinamic/lib/md-collection-loader" +
          `?${ JSON.stringify({
            context: path.join(config.cwd, config.source),
            basepath: config.baseUrl.path,
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
          }) }`,
      },
      {
        test: /\.json$/,
        loader: "json-loader",
      },

      // your loaders
      {
        test: /\.js$/,
        loaders: [
          "babel-loader",
          "eslint-loader?fix",
        ],
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader" +
            "?localIdentName=[path][name]--[local]--[hash:base64:5]" +
            "&modules"+
          "!postcss-loader"
        ),
      },
      {
        test: /\.svg$/,
        loaders: [
          "babel-loader",
          "react-svg-loader",
        ],
      },
      {
        test: /\.(html|ico|jpe?g|png|gif)$/,
        loader: "file-loader" +
          "?name=[path][name].[ext]&context=" +
          path.join(config.cwd, config.destination),
      },
    ],
  },

  postcss: () => [
    require("stylelint"),
    require("postcss-cssnext")({ browsers: "last 2 versions" }),
    require("postcss-browser-reporter"),
    require("postcss-reporter"),
  ],

  plugins: [
    new webpack.DefinePlugin(prepareDefinedValues(config.consts)),
  ],

  markdownIt: (
    markdownIt({
      html: true,
      linkify: true,
      typographer: true,
      highlight: (code, lang) => {
        code = code.trim()
        // language is recognized by highlight.js
        if (lang && hljs.getLanguage(lang)) {
          return hljs.highlight(lang, code).value
        }
        // ...or fallback to auto
        return hljs.highlightAuto(code).value
      },
    })
      .use(markdownItTocAndAnchor, {
        tocFirstLevel: 2,
      })
  ),
}

// ↓ HANDLE WITH CARE

builder({
  config,
  staticAssets: "assets", // relative to content folder
  clientWebpackConfig: {
    ...webpackConfig,

    entry: {
      "statinamic-client": path.join(__dirname, "index-client"),
    },

    plugins: [
      ...webpackConfig.plugins,

      // ! \\ the static build below will extract the exact same thing in the
      // same file, but here we use extract plugin to REMOVE REDUNDANT CSS
      // from the build. Since there is a static build that is used for the
      // first viewed page (which contains all css), we don't need styles in
      // the JS too.
      new ExtractTextPlugin(
        "[name].css",
        { disable: config.dev }
      ),

      ...config.prod && [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
          },
        }),
      ],
    ],
  },
  staticWebpackConfig: {
    ...webpackConfig,

    entry: {
      "statinamic-static": path.join(__dirname, "index-static"),
    },

    target: "node",

    externals: [
      ...fs.readdirSync("node_modules").filter((x) => x !== ".bin"),
      "statinamic/lib/md-collection-loader/cache",
    ],

    output: {
      ...webpackConfig.output,
      libraryTarget: "commonjs2",
      path: __dirname,
    },

    plugins: [
      ...webpackConfig.plugins,

      // extract (and overwrite) statinamic client css
      // poor workaround to avoid having 2 identical files...
      new ExtractTextPlugin(
        path.join("..", config.destination, "statinamic-client.css")
      ),
    ],
  },
})
