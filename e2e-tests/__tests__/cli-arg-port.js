import {
  exec,
  execOpts,
  phenomic,
  timing,
  maxTimeout,
} from "./utils"

it("should NOT throw if port is used",
() => new Promise((resolve, reject) => {
  const app = require("express")()
  const server = app.listen(3333, (err) => {
    if (err) {
      reject(err)
    }

    const child = exec(
      `${ phenomic } start --open=false --devPort=3333`, execOpts,

      (err) => {
        if (err && !err.killed) {
          clearTimeout(timeout)
          reject(err)
        }
      }
    )

    // server need to be killed manually
    const timeout = setTimeout(() => {
      server.close()
      child.kill()
      resolve()
    }, timing)
  })
}), maxTimeout)
