import test from "ava"
import suppose from "suppose"
import fs from "fs"

test.cb("test inquirer interface", (t) => {
  suppose(
    "node",
    [ "./stub/spawn-prompt.js" ],
    { debug: fs.createWriteStream("debug.txt") }
  )
  .when(/Name of your project/, "Statinamic\n")
  .when(/Homepage url for your website/, "http://moox.io/statinamic\n")
  .when(/Should statinamic generate a CNAME file/, "\n")
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
