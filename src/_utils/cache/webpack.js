// @flow

import { join } from "path"
import HardSourceWebpackPlugin from "hard-source-webpack-plugin"
import ObjectHash from "node-object-hash"
import findCacheDir from "find-cache-dir"

export default (config: PhenomicConfig): Array<any> => {
  if (!config.cache) {
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
