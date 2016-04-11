import { spawn } from "child_process"
import pkg from "../package.json"
import globby from "globby"
import throat from "throat"

const spawnAva = (file) => (
  new Promise((resolve, reject) => {
    if (typeof file === "string") {
      file = [ file ]
    }
    console.log("=".repeat(20))
    console.log(file)
    console.log("=".repeat(20))

    const ps = spawn(
      "node",
      [
        "./node_modules/.bin/ava",
        ...file,
      ],
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

const exit = (err) => {
  setImmediate(() => {
    process.exit(err)
  })
}

if (process.env.TRAVIS && process.version.startsWith("v4")) {
  globby(pattern)
  .then((tests) => (
    Promise.all(
      tests.map(throat(3, (file) => spawnAva(file)))
    ))
  )
  .catch(exit)
}
else {
  spawnAva(pattern)
  .catch(exit)
}
