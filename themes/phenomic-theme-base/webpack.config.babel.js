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
        // *.md => consumed via phenomic special webpack loader
        // allow to generate collection and rss feed.
        {
          // phenomic requirement
          test: /\.md$/,
          loader: phenomicLoader,
          // config is in `phenomic` section later in the file
          // so you can use functions (and not just JSON) due to a restriction
          // of webpack that serialize/deserialize loader `query` option.
        },

        // *.json => like in node, return json
        // (not handled by webpack by default)
        {
          test: /\.json$/,
          loader: "json-loader",
        },

        // *.js => babel + eslint
        {
          test: /\.js$/,
          loaders: [
            `babel-loader${
              config.dev
              ? "?cacheDirectory=true&presets[]=babel-preset-react-hmre"
              : "?cacheDirectory=true"
            }`,
            "eslint-loader?fix",
          ],
          include: [
            path.resolve(__dirname, "scripts"),
            path.resolve(__dirname, "web_modules"),
          ],
        },

        // ! \\
        // by default *.css files are considered as CSS Modules
        // And *.global.css are considered as global (normal) CSS

        // *.css => CSS Modules
        {
          test: /\.css$/,
          exclude: /\.global\.css$/,
          include: path.resolve(__dirname, "web_modules"),
          loader: ExtractTextPlugin.extract(
            "style-loader",
            [ `css-loader?modules&localIdentName=${
                config.production
                ? "[hash:base64:5]"
                : "[path][name]--[local]--[hash:base64:5]"
              }`,
              "postcss-loader",
            ].join("!"),
          ),
        },
        // *.global.css => global (normal) css
        {
          test: /\.global\.css$/,
          include: path.resolve(__dirname, "web_modules"),
          loader: ExtractTextPlugin.extract(
            "style-loader",
            [ "css-loader", "postcss-loader" ].join("!"),
          ),
        },
        // ! \\
        // If you want global CSS only, just remove the 2 sections above
        // and use the following one
        // ! \\ If you want global CSS for node_modules only, just uncomment
        // this section and the `include` part
        // {
        //   test: /\.css$/,
        //   // depending on your need, you might need to scope node_modules
        //   // for global CSS if you want to keep CSS Modules by default
        //   // for your own CSS. If so, uncomment the line below
        //   // include: path.resolve(__dirname, "node_modules"),
        //   loader: ExtractTextPlugin.extract(
        //     "style-loader",
        //     [ "css-loader", "postcss-loader" ].join("!"),
        //   ),
        // },
        // ! \\ if you want to use Sass or LESS, you can add sass-loader or
        // less-loader after postcss-loader (or replacing it).
        // ! \\ You will also need to adjust the file extension
        // and to run the following command
        //
        // Sass: `npm install --save-dev node-sass sass-loader`
        // https://github.com/jtangelder/sass-loader
        //
        // LESS: npm install --save-dev less less-loader
        // https://github.com/webpack/less-loader

        // copy assets and return generated path in js
        {
          test: /\.(html|ico|jpe?g|png|gif)$/,
          loader: "file-loader" +
            "?name=[path][name].[hash].[ext]&context=" +
            path.join(__dirname, config.source),
        },

        // svg as raw string to be inlined
        {
          test: /\.svg$/,
          loader: "raw-loader",
        },
      ],
    },

    phenomic: {
      context: path.join(__dirname, config.source),
      // plugins: [ ...phenomicLoaderPresets.markdown ]
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
      new ExtractTextPlugin("[name].[hash].css", { disable: config.dev }),
      ...config.production && [
        new webpack.optimize.DedupePlugin(),
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
