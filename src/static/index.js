// @flow
import color from "chalk"
import debug from "debug"

import toStaticHtml from "./to-html"
import postBuild from "./postbuild"

const log = debug("phenomic:static")

export default function(config: PhenomicConfig): Promise<void> {
  return toStaticHtml(config)
  .then(files => postBuild(config, files, log))
  .catch((error) => {
    log(color.red("✗ Static build failed"))
    setTimeout(() => {
      throw error
    }, 1)
  })
}
