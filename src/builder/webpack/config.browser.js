import { join } from "path"

export const chunkNameBrowser = "phenomic.browser"

export default (config) => {
  return {
    ...config.webpackConfig,

    entry: {
      ...config.webpackConfig.entry,
      // no need for other entries
      [chunkNameBrowser]: join(config.cwd, config.scriptBrowser),
    },
  }
}
