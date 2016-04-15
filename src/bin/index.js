#!/usr/bin/env node

// still in src/, handy to play
if (__filename.indexOf("phenomic/src") > 1) {
  require("babel-register")
}

require("./phenomic.js")
