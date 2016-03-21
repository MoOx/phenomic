const stat = require("fs").stat
const spawn = require("child_process").spawn
const join = require("path").join
const pkg = require("../package.json")

// no need for this step on CI
if (process.env.CI) {
  process.exit(0)
}

stat("lib", function(error, stats1) {
  if (!error && stats1.isDirectory()) {
    return true
  }

  console.warn(
    "\n" +
    "Builded sources not found. It looks like you might be attempting " +
    `to install ${ pkg.name } from git. \n` +
    "Sources need to be transpiled before use. This may take a moment." +
    "\n"
  )

  const spawnOpts = {
    stdio: "inherit",
    cwd: join(__dirname, "../"),
  }

  const fail  = (err) => {
    console.error(`Failed to build ${ pkg.name } automatically. `)

    if (err) {
      throw err
    }
  }

  const installTranspiler = spawn(
    "npm",
    [ "i" , "babel-core", "babel-cli", ...pkg.babel.presets ],
    spawnOpts
  )

  installTranspiler.on("error", fail)
  installTranspiler.on("close", (code) => {
    if (code === 0) {
      const installer = spawn(
        "npm",
        [ "run", "transpile" ],
        spawnOpts
      )

      installer.on("error", fail)
    }
  })
})
