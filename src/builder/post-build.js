import { join } from "path"
import fs from "fs"

import pify from "pify"
import colors from "chalk"

import log, { plainLog, totalElapsedTime } from "../_utils/log"

const { writeFile } = pify(fs)

export default function(
  config: PhenomicOldConfig,
  files: Array<any>
): Promise<any> {
  log(`${ files.length } files written`, "info")

  const promises = []

  if (config.CNAME) {
    promises.push(
      writeFile(
        join(config.cwd, config.destination, "CNAME"),
        config.baseUrl.hostname,
      )
      .then(() => log(`CNAME created with '${ config.baseUrl.hostname }'`))
    )
  }

  if (config.nojekyll) {
    promises.push(
      writeFile(
        join(config.cwd, config.destination, ".nojekyll"),
        "",
      )
      .then(() => log(".nojekyll created"))
    )
  }

  return (
    Promise.all(promises)
    .then(() => plainLog(
      colors.green("Build successful") +
      " " +
      totalElapsedTime()
    ))
  )
}
