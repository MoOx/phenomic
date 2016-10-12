import "babel-polyfill"
import { join } from "path"
import colors from "chalk"

import setup from "./commands/setup/index.js"

import yargs from "../configurator/yargs.js"
import configurator from "../configurator/index.js"
import log from "../_utils/log"

const runner = () => {
  log("Phenomic is starting", "info")
  const cwd = process.cwd()
  const pkg = require(join(cwd, "package.json"))
  const config = configurator({ argv: process.argv, pkg })

  // lazyload builder to avoid issue when webpack is no installed yet
  // @todo move runner() out of this file so setup can work without
  // lazyloading via "require()"
  const builder = require("../builder/index.js").default
  builder(config)
}

const startAndBuildOptions = {
  "webpack-config": {
    type: "string",
    describe: "Webpack config (must export a function)",
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

yargs.check((argv) => {
  // requires at least 1 argument
  // show help when type `$ phenomic`
  // argv._ = [
  //   nodePath,
  //   pathToPhenomicScript,
  //   input argvs
  // ]
  if (argv._.length < 3) {
    throw new Error(
      colors.bgRed(colors.white("ERROR")) +
      colors.red(" You must specify command for Phenomic CLI")
    )
  }

  // Unknown command
  const currentCommand = argv._[2]
  if ([ "start", "build", "setup" ].indexOf(currentCommand) < 0) {
    throw new Error(
      colors.bgRed(colors.white("ERROR")) +
      colors.red(` Unknown command "${ currentCommand }"`)
    )
  }
})

yargs.parse(process.argv)
