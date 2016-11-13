// ⚠️
// not too much es2015 as this is delivered/run via npm as is
// ⚠️

const stat = require("fs").stat
const spawn = require("child_process").spawn
const join = require("path").join

const fs = require("fs-extra")

const pkg = require("../package.json")

const spawnOpts = {
  stdio: "inherit",
  cwd: join(__dirname, "../"),
}

// e2e-tests are only present if you clone the full repo
// (won't be present when npm install with git ref)

stat("e2e-tests", function(error, stats) {

  // for dev install, we prepare docs and base theme deps
  if (!error && stats.isDirectory()) {
    console.log("Tweaking and installing dependencies for docs & themes")

    const babelNode = /^win/.test(process.platform)
      ? ".\\node_modules\\.bin\\babel-node"
      : "babel-node"

    spawn(babelNode, [ "scripts/docs.js" ], spawnOpts)
    .on("error", (err) => {
      console.error("Failed to prepare docs")
      console.error(err)
    })

    spawn(babelNode, [ "scripts/phenomic-theme-base.js" ], spawnOpts)
    .on("error", (err) => {
      console.error("Failed to prepare phenomic-theme-base")
      console.error(err)
    })

    spawn(babelNode, [ "scripts/test-setup.js" ], spawnOpts)
    .on("error", (err) => {
      console.error("Failed to prepare test-setup")
      console.error(err)
    })
  }
})

// npm rename .gitignore to .npmignore (which is just stupid for us)
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

// if repo installed from npm, we try to compile src
stat("lib", function(error, stats) {

  // no need for th is step on CI,
  // only make sense when cloning the repo for dev
  if (process.env.CI) {
    return true
  }

  // if lib is present, no need to transpile
  if (!error && stats.isDirectory()) {
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
