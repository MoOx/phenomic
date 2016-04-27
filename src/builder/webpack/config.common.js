import { DefinePlugin } from "webpack"

export const chunkNameBrowser = "phenomic.browser"

export default (config) => {
  const { webpackConfig } = config
  return {
    ...webpackConfig,

    plugins: [
      ...webpackConfig.plugins,
      new DefinePlugin({ "process.env": {
        NODE_ENV: JSON.stringify(
          config.production ? "production" : process.env.NODE_ENV
        ),
        PHENOMIC_PATHNAME: JSON.stringify(process.env.PHENOMIC_PATHNAME),
      } }),
    ],
  }
}
