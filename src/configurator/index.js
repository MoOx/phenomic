import yargs from "./yargs.js"

import definitions from "./definitions.js"
import * as validators from "./validators.js"

export default function config(pkg = {}, argv = process.argv) {
  const userJSConfig = pkg.statinamic || {}

  const errors = []

  // validate user parameters
  Object.keys(userJSConfig).forEach((key) => {
    if (!definitions[key]) {
      errors.push(
        `Unknow option '${ key }'.`
      )
    }
    else if (
      definitions[key].type !== undefined &&
      definitions[key].type !== typeof userJSConfig[key]
    ) {
      errors.push(
        `Wrong type for '${ key }': expected '${ definitions[key].type }', ` +
        `got '${ typeof userJSConfig[key] }'.`
      )
    }
  })

  const defaultAndCLIconfig = yargs.parse(argv)

  // delete unwanted yargs parameters
  delete defaultAndCLIconfig.$0
  delete defaultAndCLIconfig._
  delete defaultAndCLIconfig.help
  delete defaultAndCLIconfig.version

  const config = {
    ...defaultAndCLIconfig,
    ...userJSConfig,
  }

  // validation/adjustement for each options
  Object.keys(validators).forEach((key) => {
    validators[key]({
      pkg,
      config,
      definitions,
      errors,
    })
  })

  if (errors.length > 0) {
    throw new Error(
      "Your config is invalid. Please fix the errors: \n- " +
      errors.join("\n- ") +
      "\n\n" +
      "See 'Configuration' section in documentation."
    )
  }

  return config
}
