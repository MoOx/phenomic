// @flow

import { join } from "path"

import commonWebpackConfig from "./config.common.js"
import { offlinePlugin, offlineEntry } from "../../_utils/offline/webpack.js"

const chunkNameBrowser = "phenomic.browser"

export default (config: PhenomicConfig): WebpackConfig => {
  const webpackConfig = commonWebpackConfig(config)

  return {
    ...webpackConfig,

    plugins: [
      ...webpackConfig.plugins,
      ...offlinePlugin(config),
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
