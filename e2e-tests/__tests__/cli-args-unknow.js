import {
  exec,
  execOpts,
  phenomic,
  timing,
  maxTimeout,
} from "./utils"

it("should throw if a CLI flag is NOT recognized",
() => new Promise((resolve, reject) => {
  const child = exec(
    `${ phenomic } start --open=false --lol`, execOpts,
    (err) => {
      if (err && !err.killed) {
        clearTimeout(timeout)
        const isUnknown = err.message.indexOf("Unknown argument") > -1
        if (isUnknown) {
          resolve()
          return
        }
        console.log(err)
      }
      reject()
    }
  )

  // server need to be killed manually
  const timeout = setTimeout(
    () => {
      child.kill()
      reject("Test didn't finish before timeout")
    },
    timing
  )
}), maxTimeout)
