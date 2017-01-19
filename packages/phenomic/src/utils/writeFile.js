/**
 * @flow
 */
const fs = require("fs")
const mkdirp = require("mkdirp")
const path = require("path")

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

module.exports = writeFile
