import webpack from "webpack"
import color from "chalk"

export default (webpackConfig, log, cb) => {
  webpack(webpackConfig, (err, stats) => {
    if (err) {
      throw err
    }

    if (stats.hasErrors()) {
      stats.compilation.errors.forEach(
        item => log(color.red(item.stack || item))
      )
      throw new Error("webpack build failed with errors")
    }

    if (stats.hasWarnings()) {
      stats.compilation.warnings.forEach(
        item => log(color.yellow("Warning: %s", item.message))
      )
    }

    cb(stats)
  })
}
