import {
  exec,
  execOpts,
  phenomic,
  timing,
  maxTimeout,
} from "./utils"

it("should NOT throw if a CLI flag is recognized",
() => new Promise((resolve, reject) => {
  const child = exec(
    `${ phenomic } start --open=false --devPort=4000`, execOpts,

    // should die quickly...
    (err) => {
      if (err && !err.killed) {
        clearTimeout(timeout)
        reject(err)
      }
    }
  )

  // ...or be ok quickly
  // we assume it's ok and kill the process
  // we don't need the actual build
  const timeout = setTimeout(() => {
    child.kill()
    resolve()
  }, timing)
}), maxTimeout)
