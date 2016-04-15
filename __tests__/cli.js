import test from "ava"
import { join } from "path"

import { exec } from "child_process"

const target = join(__dirname, "..", "test-boilerplate")
const execOpts = { cwd: target }

const phenomic = "node ./node_modules/.bin/phenomic"

// cannot be done for now
// see the mess in configurator which use process.argv directly
// and since build.js is spawned, we got too many args and cannot use
// yargs.strict()
// https://github.com/MoOx/phenomic/issues/363
// test.cb("should throw if a CLI flag is NOT recognized", (t) => {
//   const child = exec(
//     `${ phenomic } start --open=false --lol`, execOpts,
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
//   }, 1000)
// })

test.cb("should NOT throw if a CLI flag is recognized", (t) => {
  const child = exec(
    `${ phenomic } start --open=false --devPort=4000`, execOpts,

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

  // ...or be ok quickly
  // (so we assume it's ok and kill the process, we don't need the actual build)
  const timeout = setTimeout(() => {
    child.kill()
    t.pass()
    t.end()
  }, 1000)
})

test.cb("should NOT throw if port is used", (t) => {
  const app = require("express")()

  const server = app.listen(8081, (err) => {
    if (err) {
      t.fail()
      t.end()
    }

    const child = exec(
      `${ phenomic } start --open=false --devPort=8081`, execOpts,

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
      server.close()
      t.pass()
      t.end()
    }, 2000)
  })
})
