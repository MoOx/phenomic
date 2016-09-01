// @flow

import { join } from "path"
import commonWebpackConfig from "./config.common.js"
import { offlinePlugin, offlineEntry } from "../../_utils/offline/webpack.js"
import {
  getCacheDir,
  hardSourceRecordsPath,
  hardSourcePlugin,
} from "../../_utils/hard-source-webpack-plugin"

const chunkNameBrowser = "phenomic.browser"

export default (config: PhenomicConfig): WebpackConfig => {

  const cacheDir = getCacheDir(config)
  const webpackConfig = commonWebpackConfig(config)

  return {
    ...webpackConfig,
    ...config.webpackHardCache && hardSourceRecordsPath(cacheDir),
    plugins: [
      ...webpackConfig.plugins,
      ...offlinePlugin(config),
      ...config.webpackHardCache && hardSourcePlugin(cacheDir, config),
    ],

    entry: {
      ...config.webpackConfig ? config.webpackConfig.entry : {},

      [chunkNameBrowser]: [
        join(config.cwd, config.scriptBrowser),
        ...offlineEntry(config),
      ],
    },
  }
}
