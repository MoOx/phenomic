// @flow

import { join } from "path"
import commonWebpackConfig from "./config.common.js"
import { offlinePlugin, offlineEntry } from "../../_utils/offline/webpack.js"
import PhenomicLoaderWebpackPlugin from "../../loader/plugin.js"

import createSearchIndexWebpackPlugin
from "../../_utils/search/create-index/webpack-plugin"

const chunkNameBrowser = "phenomic.browser"

export default (config: PhenomicConfig): WebpackConfig => {

  const webpackConfig = commonWebpackConfig(config)

  return {
    ...webpackConfig,
    plugins: [
      new PhenomicLoaderWebpackPlugin(),
      new createSearchIndexWebpackPlugin(),
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
