import "babel-polyfill"
import { join } from "path"

import setup from "./commands/setup/index.js"

import builder from "../builder/index.js"
import yargs from "../configurator/yargs.js"
import configurator from "../configurator/index.js"
import log from "../_utils/log"

const runner = () => {
  log("Phenomic is starting", "info")
  const cwd = process.cwd()
  const pkg = require(join(cwd, "package.json"))
  const config = configurator({ argv: process.argv, pkg })
  builder(config)
}

const startAndBuildOptions = {
  "webpack-config": {
    type: "string",
    describe: "Webpack config (must expose a 'makeConfig' function)",
    default: "webpack.config.babel.js",
  },
  "script-browser": {
    type: "string",
    describe: "Phenomic entry point (browser)",
    default: join("scripts", "phenomic.browser.js"),
  },
  "script-node": {
    type: "string",
    describe: "Phenomic entry point (node)",
    default: join("scripts", "phenomic.node.js"),
  },
}

yargs.command(
  "setup",
  "setup a project",
  {
    test: {
      describe: "Test mode (don't use this option).",
    },
  },
  setup,
)

yargs.command(
  "start",
  "start your project (server / development mode)",
  {
    ...startAndBuildOptions,
    dev: { default: true },
    server: { default: true },
    open: { default: true },
  },
  runner
)

yargs.command(
  "build",
  "build your project (static / production mode)",
  {
    ...startAndBuildOptions,
    production: { default: true },
    static: { default: true },
  },
  runner
)

yargs.parse(process.argv)
