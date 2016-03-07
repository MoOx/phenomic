/* eslint-disable no-var */
var program = require("commander")
var pkg = require("../../package.json")

import runner from "./runner.js"

program.version(pkg.version)

program
  .command("setup", "setup a project")

program
  .command("start [script] [options...]")
  .description("start your project (server / development mode)")
  .option("-c, --config <file>", "Configuration file")
  .action(runner([ "--dev", "--server", "--open" ]))

program
  .command("build [script] [options...]")
  .description("build your project (static / production mode)")
  .option("-c, --config <file>", "Configuration file")
  .action(runner([ "--production", "--static" ]))

program.parse(process.argv)
