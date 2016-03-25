// Stolen from https://git.io/vajFu @ben-eb
import { spawn } from "child_process"
import pkg from "../package.json"
import globby from "globby"

const throttlePromise = (myArray, iterator, limit) => {
  const pickUpNextTask = () => {
    if (myArray.length) {
      return iterator(myArray.shift())
    }
  }
  const startChain = () => (
    Promise.resolve().then(function next() {
      return pickUpNextTask().then(next)
    })
  )

  const chains = []
  for (let k = 0; k < limit; k += 1) {
    chains.push(startChain())
  }
  Promise.all(chains)
}

const spawnAva = (file) => (
  new Promise((resolve, reject) => {
    // Normalize string to array
    const filesToTest = (Array.isArray(file)) ? file : [ file ]

    const ps = spawn(
      process.execPath,
      [ "node_modules/.bin/ava", ...filesToTest ],
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
    throttlePromise(tests, spawnAva, 2)
  })
  .catch((err) => {
    throw err
  })
}
else {
  spawnAva(pattern)
}
