#!/usr/bin/env node

if (!process.env.DEBUG) {
  process.env.DEBUG = "phenomic:*"
}

// still in src/, handy to play
if (__filename.indexOf("phenomic/src") > 1) {
  require("babel-register")
}
else {
// we babel register for .babel.js files (eg: user webpack.config.babel.js)
  require("babel-register")({
    only: /\.babel\.js$/,
  })
}

require("./phenomic.js")
