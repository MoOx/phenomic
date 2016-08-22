// @flow

import { join } from "path"
import { DefinePlugin } from "webpack"
import commonWebpackConfig from "./config.common.js"
import { offlinePlugin, offlineEntry } from "../../_utils/offline/webpack.js"

const chunkNameBrowser = "phenomic.browser"
const wrap = JSON.stringify
export default (config: PhenomicConfig): WebpackConfig => {
  const webpackConfig = commonWebpackConfig(config)

  return {
    ...webpackConfig,

    plugins: [
      ...webpackConfig.plugins,
      new DefinePlugin({ 
        "process.env": {
          PHENOMIC_BROWSER_CONTEXT: wrap(true),
        }
      }),

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
