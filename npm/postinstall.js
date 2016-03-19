/* eslint-disable no-var */

var stat = require("fs").stat
var spawn = require("child_process").spawn
var join = require("path").join
var pkg = require("../package.json")

console.log(pkg.name, "post-install", process.cwd())

stat("lib", function(error, stats1) {
  if (!error && stats1.isDirectory()) {
    return true
  }

  console.warn(
    "Builded sources not found. It looks like you might be attempting " +
    `to install ${ pkg.name } from git. ` +
    "Sources need to be transpiled before use and this will require you to " +
    `have babel-cli installed as well as ${ pkg.babel.presets }.`
  )

  var installer = spawn("npm", [ "run", "transpile" ], {
    stdio: "inherit",
    cwd: join(__dirname, "../"),
  })

  installer.on("error", function(err) {
    console.error(`Failed to build ${ pkg.name } automatically. `)

    throw err
  })
})
