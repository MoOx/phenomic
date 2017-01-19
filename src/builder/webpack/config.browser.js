// @flow

import { join } from "path"

import { offlinePlugin, offlineEntry } from "../../_utils/offline/webpack.js"
// module.exports is used
// eslint-disable-next-line import/default
import PhenomicLoaderWebpackPlugin from "../../loader/plugin.js"

import commonWebpackConfig from "./config.common.js"

const chunkNameBrowser = "phenomic.browser"

export default (config: PhenomicOldConfig): WebpackConfig => {

  const webpackConfig = commonWebpackConfig(config)

  return {
    ...webpackConfig,
    plugins: [
      new PhenomicLoaderWebpackPlugin(),
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
