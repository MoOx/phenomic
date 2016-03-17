import test from "ava"
import { join } from "path"

import { denodeify as asyncify } from "promise"
import { exec } from "child_process"

const asyncExec = asyncify(exec)

const target = join(__dirname, "..", "test-boilerplate")
const execOpts = { cwd: target }

const statinamic = "./node_modules/.bin/statinamic"

test("should throw if a CLI flag is NOT recognized", async (t) => {
  return (
    asyncExec(`${ statinamic } start --lol`, execOpts)
    .then(
      () => t.fail(),
      (err) => {
        t.ok(err.message.indexOf("Unknown option `--lol'") > -1)
      }
    )
  )
})

test.cb("should NOT throw if a CLI flag is recognized", (t) => {
  const child = exec(
    `${ statinamic } start --devPort=4000`, execOpts,

    // should die quickly...
    (err) => {
      if (err) {
        clearTimeout(timeout)
        t.fail()
        t.end()
      }
    }
  )

  // ...or be ok quickly
  // (so we assume it's ok and kill the process, we don't need the actual build)
  const timeout = setTimeout(() => {
    t.pass()
    t.end()
    child.kill()
  }, 500)
})
