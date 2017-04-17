#!/usr/bin/env node

// this babel register is mainly so you can have a webpack config file in es6
// without a .babel extension
require("babel-register")({
  sourceMap: process.env.DEBUG !== "" ? "inline": undefined,
})

// $FlowFixMe lib/* are ignored
require("./lib/bin.js")
