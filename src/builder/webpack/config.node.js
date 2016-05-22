import { join, basename } from "path"
import { BannerPlugin } from "webpack"
import commonWebpackConfig from "./config.common.js"
import { sync as mkdir } from "mkdirp"
export const chunkNameNode = "phenomic.node"

export default (config) => {
  const webpackConfig = commonWebpackConfig(config)

  const outputPath = join(config.cwd, "temp")
  mkdir(outputPath)

  return {
    ...webpackConfig,

    entry: {
      // no need for other entries
      [chunkNameNode]: join(config.cwd, config.scriptNode),
    },

    output: {
      ...webpackConfig.output,
      path: outputPath,
      libraryTarget: "commonjs2",
      filename: basename(config.scriptNode, ".js") + ".bundle.js",
    },

    target: "node",

    // externals for package/relative name
    externals: [
      ...webpackConfig.externals || [
        // node modules
        /^[a-z0-9-_]/,
      ],

      // we need this to be the same between the entire node runtime
      "phenomic/lib/content-loader/cache",
    ],

    // sourcemaps
    devtool: "#eval-source-map",
    plugins: [
      ...webpackConfig.plugins || [],
      new BannerPlugin(
        "require('source-map-support').install();",
        { raw: true, entryOnly: false }
      ),
    ],
  }
}
