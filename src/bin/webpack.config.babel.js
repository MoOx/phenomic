import { tmpdir } from "os"

const config = require(process.env.PHENOMIC_CONFIG).default

// TODO warn about config like entry
// TODO warn for output config

// mostly here, you will find babel-plugin-webpack-loaders requirements
export default {
  ...config.webpackConfig,

  output: {
    ...config.webpackConfig.output,

    // for node usage
    libraryTarget: "commonjs2",

    // https://github.com/istarkov/babel-plugin-webpack-loaders/issues/51
    filename: undefined,

    // prevent babel-plugin-webpack-loaders emited files to be in your dist
    // folder, see // https://github.com/MoOx/phenomic/issues/214
    path: tmpdir(),
  },
}
