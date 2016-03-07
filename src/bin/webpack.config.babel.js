// import { tmpdir } from "os"
// import path from "path"
// import webpack from "webpack"
// import ExtractTextPlugin from "extract-text-webpack-plugin"

const config = require(process.env.STATINAMIC_CONFIG).default

// TODO disable all ExtractTextPlugin for node
// disabled because not needed
// https://github.com/MoOx/statinamic/issues/253
// webpackConfig.plugins.forEach((plugin) => {
//   if (plugin instanceof ExtractTextPlugin) {
//     plugin.options.disable = true
//   }
// })
//
// TODO warn about config like entry
// TODO warn for output config
//

// mostly here, you will find babel-plugin-webpack-loaders requirements
export default {
  ...config.webpackConfig,

  output: {
    ...config.webpackConfig.output,
    // for node usage
    libraryTarget: "commonjs2",

    // https://github.com/istarkov/babel-plugin-webpack-loaders/issues/51
    filename: undefined,

    // path: tmpdir(),
  },
}
