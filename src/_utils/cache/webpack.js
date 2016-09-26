// @flow

import { join } from "path"
import HardSourceWebpackPlugin from "hard-source-webpack-plugin"
import ObjectHash from "node-object-hash"
import findCacheDir from "find-cache-dir"
import webpackVersion from "../webpack-version"
import log from "../log"

let warned = false

export default (config: PhenomicConfig): Array<any> => {
  if (!config.cache) {
    return []
  }

  if (webpackVersion() === 2) {
    if (!warned) {
      log(
        "Phenomic 'cache' option is not compatible yet with webpack@2 so the " +
        "option is ignored. \n" +
        "Please track https://github.com/MoOx/phenomic/issues/777"
      )
      warned = true
    }
    return []
  }

  const cacheDir = findCacheDir({
    name: "phenomic/webpack-hard-source-cache/[confighash]/",
  })

  return [
    new HardSourceWebpackPlugin({
      cacheDirectory: join(cacheDir),
      recordsPath: join(cacheDir, "records.json"),
      configHash: (config) => (new ObjectHash()).hash(config),
      environmentPaths: {
        root: config.cwd,
        files: [
          "package.json",
          "webpack.config.babel.js",
        ],
      },
    }),
  ]
}
