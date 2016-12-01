import { join } from "path"

import colors from "chalk"

import yargs from "./yargs.js"
import definitions from "./definitions.js"
import minimalValidator from "./minimal-validator.js"
// eslint-disable-next-line import/no-namespace
import * as validators from "./validators.js"

export default function config({ argv = [], pkg = {} } = {}) {
  const userJSConfig = pkg.phenomic || {}

  yargs.strict()

  const defaultAndCLIconfig = yargs.parse(argv)

  // delete unwanted yargs parameters
  delete defaultAndCLIconfig.$0
  delete defaultAndCLIconfig._
  delete defaultAndCLIconfig.help
  delete defaultAndCLIconfig.version

  // validate user parameters
  const errors = [
    ...minimalValidator(userJSConfig, definitions),
    // https://github.com/MoOx/phenomic/issues/363
    // ...minimalValidator(defaultAndCLIconfig, definitions),
  ]

  const config = {
    ...defaultAndCLIconfig,
    ...userJSConfig,
    ...process.env.TESTING && userJSConfig.cwd === undefined && {
      cwd: join(__dirname, "__tests__"),
    },
  }

  // validation/adjustement for each options
  Object.keys(validators).forEach((key) => {
    // eslint-disable-next-line import/namespace
    validators[key]({
      pkg,
      config,
      definitions,
      errors,
    })
  })

  if (errors.length > 0) {
    const errorMessage = (
      "\n⚠️ " + "phenomic: " +
      colors.yellow("your config is invalid. Please fix the errors:") +
      "\n\n" +
      colors.red("- " + errors.join("\n- ")) +
      "\n\n" +
      colors.yellow("See 'Configuration' section in documentation.") +
      " " +
      "https://phenomic.io/docs/usage/configuration/"
    )
    if (process.env.TESTING) {
      throw new Error(errorMessage)
    }
    // else
    console.error(errorMessage)
    process.exit(1)
  }

  return config
}

export function testConfig(cfg) {
  return config({
    pkg: { phenomic: cfg },
  })
}
