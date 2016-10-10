const stat = require("fs").stat
const spawn = require("child_process").spawn
const join = require("path").join

const fs = require("fs-extra")

const pkg = require("../package.json")
// no need for th is step on CI
if (process.env.CI) {
  process.exit(0)
}

const phenomicThemeBaseDir = join(__dirname, "../themes/phenomic-theme-base")

stat(join(phenomicThemeBaseDir, ".npmignore"), function(err) {
  if (err) {
    console.log("No .npmignore in phenomic-theme-base to rename")
    return true
  }

  fs.move(
    join(phenomicThemeBaseDir, ".npmignore"),
    join(phenomicThemeBaseDir, ".gitignore"),
    function(err) {
      if (err) {
        throw new Error(
          "Cannot rename .npmignore to .gitignore in phenomic-theme-base"
        )
      }
    }
  )
})

stat("lib", function(error, stats1) {
  if (!error && stats1.isDirectory()) {
    return true
  }

  console.warn(
    "\n" +
    "Builded sources not found. It looks like you might be attempting " +
    `to install ${ pkg.name } from git. \n` +
    "Sources need to be transpiled before use. " +
    // see commented code below
    // "This may take a moment." +
    "\n"
  )

  const spawnOpts = {
    stdio: "inherit",
    cwd: join(__dirname, "../"),
  }

  const fail  = (err) => {
    console.error(
      `Failed to build ${ pkg.name } automatically. ` +

      // see commented babel install below
      "Do you have to required dependencies to install from git?\n" +
      "Be sure to have installed run this before:" +
      "\n\n" +
      `npm install babel-cli ${ pkg.babel.presets }` +
      "\n\n" +
      "Then rebuild phenomic by running: " +
      "\n\n" +
      "npm rebuild phenomic" +
      "\n\n"
    )

    if (err) {
      throw err
    }
  }

  // npm install fails with
  //    Cannot read property 'target' of null
  // https://github.com/npm/npm/issues/10686

  // const installTranspiler = spawn(
  //   "npm",
  //   [ "i" , "babel-cli", ...pkg.babel.presets ],
  //   spawnOpts
  // )

  // installTranspiler.on("error", fail)
  // installTranspiler.on("close", (code) => {
  //   console.log(pkg.name, "postinstall deps installed")
  //   if (code === 0) {
  const installer = spawn(
    "npm",
    [ "run", "transpile" ],
    spawnOpts
  )

  installer.on("error", fail)
  //   }
  // })
})
