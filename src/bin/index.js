#!/usr/bin/env node

const path = require("path")

const modulesPath = path.join(process.cwd(), "node_modules")
// Require hook to transpile user code
require("babel-register")({
  ignore: function(filename) {
    if (filename.startsWith(modulesPath)) {
      return true
    }
    return false
  },
})

// Check for node and npm version
// If it doesn't sastify the requirements
// The process will exits immediately
require("./check-engine")()

// The actual CLI logic
require("./phenomic.js")
