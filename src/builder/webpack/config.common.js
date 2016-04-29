import { DefinePlugin } from "webpack"
import url from "url"
import pkg from "../../../package.json"

export const chunkNameBrowser = "phenomic.browser"

const wrap = JSON.stringify

export default (config) => {
  const { webpackConfig } = config

  return {
    ...webpackConfig,

    plugins: [
      ...webpackConfig.plugins,
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
}
