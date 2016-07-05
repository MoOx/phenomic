// @flow

import { join } from "path"
import { green } from "chalk"
import fs from "fs"
import pify from "pify"
const { writeFile } = pify(fs)

export default function(
  config: PhenomicConfig,
  files: Array<any>,
  log: Function
): Promise {
  log(green(`✓ Static html files: ${ files.length } files written.`))

  const promises = []

  if (config.CNAME) {
    promises.push(
      writeFile(
        join(config.cwd, config.destination, "CNAME"),
        config.baseUrl.hostname,
      )
      .then(() => log(green(`✓ CNAME is ${ config.baseUrl.hostname }.`)))
    )
  }

  if (config.nojekyll) {
    promises.push(
      writeFile(
        join(config.cwd, config.destination, ".nojekyll"),
        "",
      )
      .then(() => log(green("✓ .nojekyll created.")))
    )
  }

  return Promise.all(promises)
    .then(() => log(green("✓ Build successful.")))
}
