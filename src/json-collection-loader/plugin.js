import fs from "fs"
import path from "path"
import cache, { cleanCache } from "./cache"

let lastOutput

function jsonCollectionPlugin(options) {
  return function() {
    this.plugin("done", () => {
      const jsonCollection = JSON.stringify(cache, null, 2)
      if (lastOutput !== jsonCollection) {
        lastOutput = jsonCollection
        fs.writeFile(
          path.join(this.outputPath, options.filename),
          jsonCollection,
          (err) => {
            if (err) {
              throw err
            }
            cleanCache()
          }
        )
      }
    })
  }
}

export default jsonCollectionPlugin
