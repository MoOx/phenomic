#!/usr/bin/env node

const path = require("path")

if (!process.env.DEBUG) {
  process.env.DEBUG = "phenomic:*"
}

// still in src/, handy to play
if (__filename.endsWith(path.join("src/bin/index.js"))) {
  require("babel-register")
}
else {
// we babel register for .babel.js files (eg: user webpack.config.babel.js)
  require("babel-register")({
    only: /\.babel\.js$/,
  })
}
// Check for node and npm version
// If it doesn't sastify the requirements
// The process will exits immediately
require("./check-engine")()

require("./phenomic.js")
