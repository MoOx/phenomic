import { spawn } from "child_process"
import pkg from "../package.json"
import globby from "globby"
import throat from "throat"

const spawnAva = (file) => (
  new Promise((resolve, reject) => {
    const ps = spawn(
      process.execPath,
      [ "node_modules/.bin/ava", file ],
      {
        stdio: "inherit",
      }
    )

    ps.on("close", (code) => {
      if (code === 0) {
        return resolve(code)
      }
      return reject(code)
    })
  })
)

const pattern = pkg.ava.files

if (process.env.TRAVIS && /v4/.test(process.version)) {
  globby(pattern)
  .then((tests) => {
    Promise.all(
      tests.map(throat(3, (file) => spawnAva(file)))
    )
  })
  .catch((err) => {
    throw err
  })
}
else {
  spawnAva(pattern)
}
