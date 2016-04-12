import "babel-polyfill"
import yargs from "../configurator/yargs.js"

import runner from "./runner.js"
import setup from "./commands/setup/index.js"

const startAndBuildOptions = {
  script: {
    default: "scripts/build.js",
  },
  config: {
    alias: "c",
    type: "string",
    describe: "Configuration file",
    default: "scripts/config.js",
  },
}

yargs
  .command(
    "setup",
    "setup a project", {
      test: {
        describe: "Test mode (don't use this option).",
      },
    },
    setup,
  )

  .command(
    "start [script]",
    "start your project (server / development mode)",
    startAndBuildOptions,
    runner([ "--dev", "--server", "--open" ])
  )

  .command(
    "build [script]",
    "build your project (static / production mode)",
    startAndBuildOptions,
    runner([ "--production", "--static" ])
  )

  .parse(process.argv)
