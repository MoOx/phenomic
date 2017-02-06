// ⚠️
// not too much es2015 as this is delivered/run via npm as is
// ⚠️

const stat = require("fs").stat
const spawn = require("child_process").spawn
const execSync = require("child_process").execSync
const join = require("path").join

const fs = require("fs-extra")

// node 4 don't like this
// const { babelNode, npm } = require("../src/_utils/bins.js")
const babelNode = require("../src/_utils/bins.js").babelNode
const npm = require("../src/_utils/bins.js").npm
const pkg = require("../package.json")

const toPrepare = [
  "docs",
  "phenomic-theme-base",
  "test-setup",
]

const spawnOpts = {
  stdio: "inherit",
  cwd: join(__dirname, "../"),
}

function prepareOtherNodeModulesFolder() {
  // e2e-tests are only present if you clone the full repo
  // (won't be present when npm install with git ref)
  stat("e2e-tests", function(error, stats) {
    // for dev install, we prepare docs and base theme deps
    if (!error && stats.isDirectory()) {
      console.log("ℹ️ Tweaking and installing dependencies for sub-projects")

      toPrepare.forEach((script) => {
        console.log("- Preparing "+ script)
        execSync(babelNode + " scripts/" + script + ".js", spawnOpts)
      })
    }
  })
}

// if repo installed from npm, we try to compile src
stat("lib", function(error, stats) {

  // if lib is present, no need to transpile
  // just prepare
  if (!error && stats.isDirectory()) {
    prepareOtherNodeModulesFolder()
    return true
  }

  console.warn(
    "\n" +
    "ℹ️ Builded sources not found. It looks like you might be attempting " +
    `to install ${ pkg.name } from git. \n` +
    "Sources need to be transpiled before use. " +
    // see commented code below
    // "This may take a moment." +
    "\n"
  )

  const fail  = (err) => {
    console.error(
      `❌ Failed to build ${ pkg.name } automatically. ` +

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
  //   npm,
  //   [ "i" , "babel-cli", ...pkg.babel.presets ],
  //   spawnOpts
  // )

  // installTranspiler.on("error", fail)
  // installTranspiler.on("close", (code) => {
  //   console.log(pkg.name, "postinstall deps installed")
  //   if (code === 0) {
  const installer = spawn(
    npm,
    [ "run", "transpile" ],
    spawnOpts
  )

  installer.on("error", fail)
  installer.on("close", function() {
    console.log("✅ Source transpiled.")
    prepareOtherNodeModulesFolder()
  })
  //   }
  // })
})

// npm rename .gitignore to .npmignore (which is just stupid for us)
const phenomicThemeBaseDir = join(__dirname, "../themes/phenomic-theme-base")
stat(join(phenomicThemeBaseDir, ".npmignore"), function(err) {
  if (err) {
    console.log("ℹ️ No .npmignore in phenomic-theme-base to rename")
    return true
  }

  fs.move(
    join(phenomicThemeBaseDir, ".npmignore"),
    join(phenomicThemeBaseDir, ".gitignore"),
    function(err) {
      if (err && err.code !== "EEXIST") {
        throw new Error(
          "Cannot rename .npmignore to .gitignore in phenomic-theme-base"
        )
      }
    }
  )
})
