// @flow

import { join } from "path"
import findCacheDir from "find-cache-dir"
import HardSourceWebpackPlugin from "hard-source-webpack-plugin"
import ObjectHash from "node-object-hash"

export const getCacheDir = (config: PhenomicConfig): string => {
  return findCacheDir({
    name: "phenomic/webpack-hard-source-cache/" +
    (new ObjectHash()).hash(config),
  })
}

export const hardSourceRecordsPath = (cacheDir: string): Object => ({
  recordsPath: join(cacheDir, "records.json"),
})

export const hardSourcePlugin = (
  cacheDir: string,
  config: PhenomicConfig
): any => ([
  new HardSourceWebpackPlugin({
    cacheDirectory: join(cacheDir, "cacheDirectory"),
    environmentPaths: {
      root: config.cwd,
      files: [
        "package.json",
        "webpack.config.babel.js",
      ],
    },
  }),
])
