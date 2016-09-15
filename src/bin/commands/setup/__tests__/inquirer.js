import fs from "fs"
import { join } from "path"

import suppose from "suppose"

// This test created to test inquirer public API
it("should works with inquirer API", () => new Promise((resolve, reject) => {
  suppose(
    "node",
    [ join(__dirname, "./fixtures/spawn-prompt.js") ],
    { debug: fs.createWriteStream(join(__dirname, "debug.txt")) }
  )
  .when(/In 1 word describe phenomic/, "Awesome\n")
  .on("error", function(error) {
    reject(error)
  })
  .end(function(code) {
    if (code !== 0) {
      reject(code)
    }
    else {
      resolve(1)
    }
  })
})
.then(
  (result) => expect(result).toBe(1),
  (error) => expect(error).toBe(undefined)
))
