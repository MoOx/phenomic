import { join } from "path"

import { exec } from "child_process"

const target = join(__dirname, "..", "test-phenomic-theme-base")
const execOpts = { cwd: target }

const phenomic = "node ./node_modules/.bin/phenomic"
const timing = process.env.CI ? 10000 : 5000

describe("Integration: CLI", () => {
  beforeEach(() => {
    process.env.BABEL_ENV = "development"
  })

  it("should throw if a CLI flag is NOT recognized", () => {
    return new Promise((resolve, reject) => {
      const child = exec(
        `${ phenomic } start --open=false --lol`, execOpts,
        (err) => {
          if (err && !err.killed) {
            clearTimeout(timeout)
            expect(err.message.indexOf("Unknown argument") > -1).toBeTruthy()
            resolve()
          }
        }
      )

      const timeout = setTimeout(() => {
        child.kill()
        reject("Test didn't finish before timeout")
      }, timing)
    })
  })

  it("should NOT throw if a CLI flag is recognized", () => {
    return new Promise((resolve, reject) => {
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
    })
  })

  it("should NOT throw if port is used", () => {
    return new Promise((resolve, reject) => {
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

        const timeout = setTimeout(() => {
          child.kill()
          server.close()
          resolve()
        }, timing * 2)
      })
    })
  })
})
