#!/usr/bin/env node

require("babel-register")()

// Check for node and npm version
// If it doesn't sastify the requirements
// The process will exits immediately
require("./check-engine")()

require("./phenomic.js")
