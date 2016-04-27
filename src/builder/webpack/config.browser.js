import { join } from "path"

export const browserFilename = "phenomic.browser"

export default (config) => {
  return {
    ...config.webpackConfig,

    entry: {
      ...config.webpackConfig.entry,
      // no need for other entries
      [browserFilename]: join(config.cwd, config.scriptBrowser),
    },
  }
}
