// @flow
import { join } from "path"
import findCacheDir from "find-cache-dir"
import HardSourceWebpackPlugin from "hard-source-webpack-plugin"

export const getCacheDir = (config: PhenomicConfig): string => {
  // Calculate hash based on config object
  console.log(config)
  const env = (config.production) ? "prod" : "dev"
  const cacheDir = findCacheDir({ name: "phenomic-hard-source-wp/" + env })

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
