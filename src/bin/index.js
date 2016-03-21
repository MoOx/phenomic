#!/usr/bin/env node

// still in src/, handy to play
if (__filename.indexOf("statinamic/src") > 1) {
  require("babel-register")
}

require("./statinamic.js")
