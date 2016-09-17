// @flow

import { DefinePlugin } from "webpack"
import url from "url"
import pkg from "../../../package.json"
import editWebpackLoaderConfig from "../../_utils/edit-webpack-loader-config"
import findCacheDir from "find-cache-dir"
import {
  getCacheDir,
  hardSourceRecordsPath,
  hardSourcePlugin,
} from "../../_utils/webpackHardCache/webpack.js"

export const chunkNameBrowser = "phenomic.browser"

const wrap = JSON.stringify

export default (config: PhenomicConfig): WebpackConfig => {

  const cacheDir = getCacheDir(config)
  const { webpackConfig = {} } = config

  let finalConfig = {
    ...webpackConfig,
    ...config.webpackHardCache && hardSourceRecordsPath(cacheDir),
    plugins: [
      ...webpackConfig.plugins,
      ...config.webpackHardCache && hardSourcePlugin(cacheDir, config),

      new DefinePlugin({ "process.env": {
        NODE_ENV: wrap(
          config.production
          ? "production"
          : process.env.NODE_ENV
        ),

        PHENOMIC_USER_PATHNAME: wrap(process.env.PHENOMIC_USER_PATHNAME),
        PHENOMIC_USER_URL: wrap(url.format(config.baseUrl)),
        PHENOMIC_NAME: wrap(pkg.name[0].toUpperCase() + pkg.name.slice(1)),
        PHENOMIC_VERSION: wrap(pkg.version),
        PHENOMIC_HOMEPAGE: wrap(pkg.homepage),
        PHENOMIC_REPOSITORY: wrap(pkg.repository),
      } }),
    ],
  }

  // Adjust babel-loader cacheDirectory configuration
  // To avoid a bunch of .json.gz files generated in process.cwd()
  // When running as root user
  // See https://github.com/MoOx/phenomic/issues/545
  finalConfig = editWebpackLoaderConfig(
    finalConfig,
    "babel-loader",
    {
      cacheDirectory: findCacheDir({ name: "phenomic/babel-loader" }),
    }
  )

  return finalConfig
}
