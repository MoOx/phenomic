import path from "path"
import webpack from "webpack"
import ExtractTextPlugin from "extract-text-webpack-plugin"

import markdownIt from "markdown-it"
import markdownItTocAndAnchor from "markdown-it-toc-and-anchor"
import hljs from "highlight.js"

import pkg from "./package.json"

import builder from "statinamic/lib/builder"
import configurator from "statinamic/lib/configurator"

const config = configurator(pkg)

const root = path.join(__dirname)
const source = path.join(root, "content")
const dest = path.join(root, "dist")

builder({
  config,
  source,
  dest,

  exports: () => ({
    routes: require("app/routes"),
    store: require("app/store"),
  }),

  webpack: {
    entry: {
      index: [
        path.join(__dirname, "client"),
      ],
    },

    output: {
      path: dest,
      filename: "[name].js",
      publicPath: "/",
    },

    resolve: {
      extensions: [
        // node default extensions
        ".js",
        ".json",
        // for all other extensions specified directly
        "",
      ],

      root: [
        path.join(__dirname, "node_modules"),
        // should be this in real world
        // path.join(__dirname, "node_modules", "statinamic", "node_modules"),
        path.join(__dirname, "web_modules", "statinamic", "node_modules"),
      ],
    },

    resolveLoader: {
      root: [
        path.join(__dirname, "node_modules"),
        path.join(__dirname, "web_modules"),
      ],
    },

    module: {
      // ! \\ note that loaders are executed from bottom to top !
      loaders: [
        //
        // statinamic requirement
        //
        {
          test: /\.md$/,
          loader: `statinamic/lib/markdown-as-json-loader?context=${ source }`,
        },
        {
          test: /\.json$/,
          loader: "json-loader",
        },

        // your loaders
        {
          test: /\.js$/,
          loaders: [
            "babel-loader" + (
              !config.__DEV__ ? "" : (
                "?" + JSON.stringify({
                  plugins: [
                    "react-transform",
                  ],
                  extra: {
                    "react-transform": [
                      // enable react hot loading
                      {
                        target: "react-transform-webpack-hmr",
                        imports: [ "react" ],
                        locals: [ "module" ],
                      },
                      // show errors on screen
                      {
                        target: "react-transform-catch-errors",
                        imports: [ "react", "redbox-react" ],
                      },
                    ],
                  },
                })
              )
            ),
            ...config.__DEV__ && [ "eslint-loader" ],
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
      ],
    },

    postcss: () => [
      require("postcss-custom-properties"),
      require("postcss-custom-media"),
      require("autoprefixer"),
    ],

    plugins: [
      new webpack.DefinePlugin(
        // transform string as "string" so hardcoded replacements are
        // syntaxically correct
        Object.keys(config).reduce((obj, constName) => {
          const value = config[constName]
          return {
            ...obj,
            [constName]: (
              typeof value === "string" ? JSON.stringify(value) : value
            ),
          }
        }, {})
      ),
      new ExtractTextPlugin("[name].css", { disable: !config.__PROD__ }),
      ...config.__PROD__ && [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin({
          compress: {
            warnings: false,
          },
        }),
      ],
    ],

    node: {
      // https://github.com/webpack/webpack/issues/451
      // run tape test with webpack
      fs: "empty",
    },

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
  },
})
