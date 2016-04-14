// @flow
import { join } from "path"
import color from "chalk"
import { writeFile } from "fs-promise"
import {
  appcache as writeAppcache,
  serviceWorker as writeServiceWorker,
} from "../_utils/offline"

export default function(
  config: PhenomicConfig,
  files: Array<any>,
  log: Function
): Promise {
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

  if (config.offline) {
    if (config.offlineConfig.appcache) {
      promises.push(
        writeAppcache(
          join(config.cwd, config.destination),
          config.baseUrl.pathname,
          config.offlineConfig.pattern,
        )
        .then(() => log(color.green("✓ manifest.appcache created.")))
      )
    }
    if (config.offlineConfig.serviceWorker) {
      promises.push(
        writeServiceWorker(
          join(config.cwd, config.destination),
          config.baseUrl.pathname,
          config.offlineConfig.pattern,
        )
        .then(() => log(color.green("✓ service worker files created.")))
      )
    }
  }

  return Promise.all(promises)
    .then(() => log(color.green("✓ Build successful.")))
}
