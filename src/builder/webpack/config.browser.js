import { join } from "path"

import commonWebpackConfig from "./config.common.js"

export const chunkNameBrowser = "phenomic.browser"

export default (config) => {
  const webpackConfig = commonWebpackConfig(config)
  return {
    ...webpackConfig,

    entry: {
      ...config.webpackConfig.entry,
      // no need for other entries
      [chunkNameBrowser]: join(config.cwd, config.scriptBrowser),
    },
  }
}
