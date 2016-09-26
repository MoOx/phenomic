// @flow

import { join, basename } from "path"
import { BannerPlugin, optimize } from "webpack"
import findCacheDir from "find-cache-dir"

import commonWebpackConfig from "./config.common.js"
import webpackVersion from "../../_utils/webpack-version"

const { UglifyJsPlugin } = optimize
const chunkNameNode = "phenomic.node"
export const cacheDir = findCacheDir({ name: "phenomic/webpack-node-build" })

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

      // keep the loader plugin cache in memory
      "phenomic/lib/loader/index",
      "phenomic/lib/loader/plugin",
    ],

    // sourcemaps
    devtool: "#source-map",
    plugins: [
      // Remove UglifyJSPlugin from plugin stack
      ...webpackConfig.plugins.filter(
        (plugin) => !(plugin instanceof UglifyJsPlugin)
      ) || [],
      ...(
        webpackVersion() === 2
        ? [ new BannerPlugin({
          banner: "require('source-map-support/register');",
          raw: true,
          entryOnly: false,
        }) ]
        : [ new BannerPlugin(
          "require('source-map-support/register');",
          { raw: true, entryOnly: false }
        ) ]
      ),
    ],
  }
}
