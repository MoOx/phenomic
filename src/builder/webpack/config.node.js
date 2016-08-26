// @flow

import { join, basename } from "path"
import { BannerPlugin, optimize } from "webpack"
import findCacheDir from "find-cache-dir"

import commonWebpackConfig from "./config.common.js"

const { UglifyJsPlugin } = optimize
const chunkNameNode = "phenomic.node"
const cacheDir = findCacheDir({ name: "phenomic" })

const defaultExternals = [
  // we could consider node_modules as externals deps
  // and so use something like
  // /^[A-Za-z0-9-_]/
  // to not bundle all deps in the static build (for perf)
  // the problem is that if people rely on node_modules for stuff
  // like css, this breaks their build.
]

export default (config: PhenomicConfig): WebpackConfig => {
  const webpackConfig = commonWebpackConfig(config)

  return {
    ...webpackConfig,

    entry: {
      // no need for other entries
      [chunkNameNode]: join(config.cwd, config.scriptNode),
    },

    output: {
      ...webpackConfig.output,
      path: cacheDir,
      libraryTarget: "commonjs2",
      filename: basename(config.scriptNode, ".js") + ".bundle.js",
    },

    target: "node",

    // externals for package/relative name
    externals: [
      ...webpackConfig.externals || defaultExternals,

      // we need this to be the same between the entire node runtime
      "phenomic/lib/phenomic-loader/cache",
    ],

    // sourcemaps
    devtool: "#inline-source-map",
    plugins: [
      // Remove UglifyJSPlugin from plugin stack
      ...webpackConfig.plugins.filter(
        (plugin) => !(plugin instanceof UglifyJsPlugin)
      ) || [],
      new BannerPlugin(
        "require('source-map-support').install();",
        { raw: true, entryOnly: false }
      ),
    ],
  }
}
