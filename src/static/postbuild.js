import { join } from "path"
import color from "chalk"
import { writeFile } from "fs-promise"
import writeAppcache from "../_utils/appcache"

export default function(config, files, log) {
  log(
    color.green(`✓ Static html files: ${ files.length } files written.`)
  )

  const promises = []

  if (config.CNAME) {
    promises.push(
      writeFile(
        join(config.cwd, config.destination, "CNAME"),
        config.baseUrl.hostname,
      )
      .then(() => log(color.green(`✓ CNAME is ${ config.baseUrl.hostname }.`)))
    )
  }

  if (config.nojekyll) {
    promises.push(
      writeFile(
        join(config.cwd, config.destination, ".nojekyll"),
        "",
      )
      .then(() => log(color.green("✓ .nojekyll created.")))
    )
  }

  if (config.appcache) {
    promises.push(
      writeAppcache(
        join(config.cwd, config.destination),
        config.baseUrl.pathname,
        config.appcache,
      )
      .then(() => log(color.green("✓ manifest.appcache created.")))
    )
  }

  return Promise.all(promises)
    .then(() => log(color.green("✓ Build successful.")))
}
