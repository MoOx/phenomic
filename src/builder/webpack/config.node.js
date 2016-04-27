// import ExternalsPlugin from "webpack-externals-plugin"
import { join, basename, dirname } from "path"
// import { readdirSync } from "fs"
import { BannerPlugin } from "webpack"

export const chunkNameNode = "phenomic.node"

export default (config) => {
  return {
    ...config.webpackConfig,

    entry: {
      // no need for other entries
      [chunkNameNode]: join(config.cwd, config.scriptNode),
    },

    output: {
      ...config.webpackConfig.output,
      path: join(
        config.cwd,
        dirname(config.scriptNode)
      ),
      libraryTarget: "commonjs2",
      filename: basename(config.scriptNode, ".js") + ".bundle.js",
    },

    target: "node",

    // externals for package/relative name
    externals: [
      ...config.webpackConfig.externals || [
        // node modules
        /^[a-z0-9-_]/,
      ],

      // we need this to be the same between the entire node runtime
      "phenomic/lib/content-loader/cache",
    ],

    // sourcemaps
    devtool: "#eval-source-map",
    plugins: [
      ...config.webpackConfig.plugins || [],
      new BannerPlugin(
        "require('source-map-support').install();",
        { raw: true, entryOnly: false }
      ),
    ],
  }
}
