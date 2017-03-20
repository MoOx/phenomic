#!/usr/bin/env node

// this babel register is mainly so you can have a webpack config file in es6
// without a .babel extension
require("babel-register")

require("./lib/bin.js")
