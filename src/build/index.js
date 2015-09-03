import { sync as rm } from "rimraf"
import { sync as mkdir } from "mkdirp"
import color from "chalk"
import nanoLogger from "nano-logger"

import webpack from "./webpack"
import devServer from "./dev-server"

export default function(options) {
  const {
    config,
    source,
  } = options
  const webpackConfig = options.webpack

  const log = nanoLogger("statinamic/lib/build")

  JSON.stringify(config, null, 2).split("\n").forEach(l => log(l))

  const dest = webpackConfig.output.path

  // cleanup
  // rm(dest)
  // mkdir(dest)

  if (config.__DEVSERVER__) {
    devServer(webpackConfig, {
      protocol: config.__SERVER_PROTOCOL__,
      host: config.__SERVER_HOSTNAME__,
      port: config.__SERVER_PORT__,
      open: process.argv.includes("--open"),
    })
  }
  else {
    webpack(webpackConfig, log, (stats) => {
      log(color.green("✓ Static assets: build completed"))

      // faking webpack.DefinePlugin for node usage
      Object.keys(config).forEach((key) => {
        global[key] = config[key]
      })

      const filenameLengthToSkip = source.length + 1
      const extLengthToSkip = ".md".length

      const pageUrls = stats.compilation.fileDependencies.reduce(
        (array, filename) => {
          if (filename.match(/\.md$/)) {
            array.push(
              filename
                // remove ext
                .slice(0, filename.length - extLengthToSkip)
                // remove source
                .substr(filenameLengthToSkip)
            )
          }
          return array
        },
        []
      )

      require("../to-static-html")({
        urls: [ "", ...pageUrls ],
        source,
        dest,
        exports: options.exports,
        log,
      })
      .then(
        (files) => {
          log(
            color.green(`✓ Static html files: ${ files.length } files written`)
          )
        },
        (error) => {
          log(color.red(`✗ Static html files: failed to create files`))
          setTimeout(() => {
            throw error
          }, 1)
        }
      )
    })
  }
}
