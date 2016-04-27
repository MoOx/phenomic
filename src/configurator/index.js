import yargs from "./yargs.js"
import definitions from "./definitions.js"
import minimalValidator from "./minimal-validator.js"
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

export function testConfig(cfg) {
  return config({
    pkg: { phenomic: cfg },
  })
}
