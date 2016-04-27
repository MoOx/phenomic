import { DefinePlugin } from "webpack"

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
      } }),
    ],
  }
}
