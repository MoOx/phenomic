import test from "ava"
import { join } from "path"

import { exec } from "child_process"

const target = join(__dirname, "..", "test-boilerplate")
const execOpts = { cwd: target }

const phenomic = "node ./node_modules/.bin/phenomic"
const timing = process.env.CI ? 10000 : 5000

test.cb("should throw if a CLI flag is NOT recognized", (t) => {
  const child = exec(
    `${ phenomic } start --open=false --lol`, execOpts,
    (err) => {
      if (err && !err.killed) {
        clearTimeout(timeout)
        t.truthy(err.message.indexOf("Unknown argument") > -1)
        t.end()
      }
    }
  )

  const timeout = setTimeout(() => {
    child.kill()
    t.fail()
    t.end()
  }, timing)
})

test.cb("should NOT throw if a CLI flag is recognized", (t) => {
  const child = exec(
    `${ phenomic } start --open=false --devPort=4000`, execOpts,

    // should die quickly...
    (err) => {
      if (err && !err.killed) {
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
  }, timing)
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
        if (err && !err.killed) {
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
    }, timing * 2)
  })
})
