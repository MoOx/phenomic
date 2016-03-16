/* eslint-disable no-var */

var stat = require("fs").stat
var spawn = require("child_process").spawn
var join = require("path").join

stat("lib", function(error, stats1) {
  if (!error && stats1.isDirectory()) {
    return true
  }

  console.warn(
    "Built output not found. It looks like you might be attempting " +
    "to install statinamic from GitHub. " +
    "Statinamic sources need to be transpiled before use."
  )

  stat("node_modules/.bin/babel", function(error, stats2) {
    if (!error && !stats2.isDirectory()) {
      return true
    }
    var installer = spawn("npm", [
      "install",
    ], {
      stdio: "inherit",
      cwd: join(__dirname, "../"),
    })

    installer.on("error", function(err) {
      console.error(
        "Failed to build Statinamic automatically. " +
        "Please install statinamic from npm " +
        "or clone the repo locally and build the library manually."
      )
      throw err
    })
  })
})
