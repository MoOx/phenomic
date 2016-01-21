import { join } from "path"
import color from "chalk"
import { writeFile } from "fs-promise"

export default (config, files, log) => {
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
      .then(() => log(color.green(`✓ .nojekyll created.`)))
    )
  }

  return Promise.all(promises)
    .then(() => log(color.green(`✓ Build successful.`)))
}
