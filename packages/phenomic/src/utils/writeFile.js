/**
 * @flow
 */
import path from "path"
import fs from "fs"

import mkdirp from "mkdirp"

const writeFile = (filepath: string, data: string) => new Promise((resolve, reject) => {
  mkdirp(path.dirname(filepath), (error) => {
    if (error) {
      reject(error)
      return
    }
    fs.writeFile(filepath, data, (error) => {
      if (error) {
        reject(error)
      }
      else {
        resolve()
      }
    })
  })
})

export default writeFile
