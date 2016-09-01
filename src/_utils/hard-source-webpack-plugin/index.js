// @flow
import { join } from "path"
import findCacheDir from "find-cache-dir"
import HardSourceWebpackPlugin from "hard-source-webpack-plugin"
import ObjectHash from "node-object-hash"

export const getCacheDir = (config: PhenomicConfig): string => {
  // Calculate hash based on config object
  const hasher = new ObjectHash()
  const hash = hasher.hash(config)

  const cacheDir = findCacheDir({ name: "phenomic/hard-source-wp/" + hash })

  return cacheDir
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
