import test from "ava"
import { join } from "path"

import { exec } from "child_process"

const target = join(__dirname, "..", "test-boilerplate")
const execOpts = { cwd: target }

const statinamic = "node ./node_modules/.bin/statinamic"

// cannot be done for now
// see the mess in configurator which use process.argv directly
// and since build.js is spawned, we got too many args and cannot use
// yargs.strict()
// https://github.com/MoOx/statinamic/issues/363
// test.cb("should throw if a CLI flag is NOT recognized", (t) => {
//   const child = exec(
//     `${ statinamic } start --lol --open=false`, execOpts,
//     (err) => {
//       if (err) {
//         clearTimeout(timeout)
//         t.ok(err.message.indexOf("Unknown argument") > -1)
//         t.end()
//       }
//     }
//   )
//
//   const timeout = setTimeout(() => {
//     child.kill()
//     t.fail()
//     t.end()
//   }, 500)
// })

test.cb("should NOT throw if a CLI flag is recognized", (t) => {
  const child = exec(
    `${ statinamic } start --devPort=4000 --open=false`, execOpts,

    // should die quickly...
    (err) => {
      if (err) {
        console.log(err)
        clearTimeout(timeout)
        t.fail()
        t.end()
      }
    }
  )

  const timeout = setTimeout(() => {
    child.kill()
    t.pass()
    t.end()
  }, 500)
})
