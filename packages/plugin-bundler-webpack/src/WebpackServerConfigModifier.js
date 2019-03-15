import webpack from "webpack";

import getWebpackConfig from "./WebpackGetConfig.js";

const requireSourceMapSupport = `require('${require
  .resolve("source-map-support/register")
  // windows support
  .replace(/\\/g, "/")}');`;

const defaultExternals = [
  // we could consider node_modules as externals deps
  // and so use something like
  // /^[A-Za-z0-9-_]/
  // to not bundle all deps in the static build (for perf)
  // the problem is that if people rely on node_modules for stuff
  // like css, this breaks their build.
  //
  // @todo find a better way than a whitelist

  // to support react hooks, we need to be sure that static rendering
  // use only one react
  // https://github.com/facebook/react/issues/13991
  "react",
  "react-dom",

  /^apollo(\/.*)?/,
  /^aphrodite(\/.*)?/,
  /^emotion(\/.*)?/,
  /^glamor(\/.*)?/,
  /^react-native(-web)?(\/.*)?/, // "react-native-web" can be used as an alias or "react-native"
  /^react-helmet(\/.*)?/,
];

export default (config, cacheDir) => {
  const webpackConfig = getWebpackConfig(config);
  return {
    ...webpackConfig,
    // only keep the entry we are going to use
    entry: {
      [config.bundleName]: webpackConfig.entry[config.bundleName],
    },
    // adjust some config details to be node focused
    target: "node",
    // externals for package/relative name
    externals: [...(webpackConfig.externals || defaultExternals)],
    output: {
      publicPath: config.baseUrl.pathname,
      path: cacheDir,
      filename: "[name].js",
      library: "app",
      libraryTarget: "commonjs2",
      devtoolModuleFilenameTemplate: "[absolute-resource-path]",
    },
    plugins: [
      ...webpackConfig.plugins,
      // sourcemaps
      new webpack.BannerPlugin({
        banner: requireSourceMapSupport,
        raw: true,
        entryOnly: false,
      }),
      // Ignore annoying isomorphic-fetch / cross-fetch encoding/iconv-loader warning
      // "Critical dependency: the request of a dependency is an expression"
      new webpack.IgnorePlugin(/\/iconv-loader$/),
    ],
    // sourcemaps
    devtool: "#source-map",
  };
};
