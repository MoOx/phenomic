import fs from "fs"

import test from "ava"
import suppose from "suppose"

// This test created to test inquirer public API
test.cb("test inquirer interface", (t) => {
  suppose(
    "node",
    [ "./stub/spawn-prompt.js" ],
    { debug: fs.createWriteStream("debug.txt") }
  )
  .when(/In 1 word describe phenomic/, "Awesome\n")
  .on("error", function(error) {
    console.error(error)
    t.fail()
    t.end()
  })
  .end(function(code) {
    if (code !== 0) {
      console.error("Script exited with code: " + code)
      t.fail()
      t.end()
    }
    else {
      t.pass()
      t.end()
    }
  })
})
