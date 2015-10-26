#!/usr/bin/env node

import program from "commander"

import pkg from "../../package.json"

program
  .version(pkg.version)
  .command("setup", "setup a project using statinamic")
  .parse(process.argv)
