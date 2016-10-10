import yargs from "yargs"

import { version } from "../../package.json"

import definitions from "./definitions.js"
// import * as validators from "./validators.js"

yargs
  .version(() => version)
  .help()
  .showHelpOnFail()
  .epilogue(
    "For more information about the configuration, " +
    "https://phenomic.io/"
  )

Object.keys(definitions).forEach((optName) => {
  const option = definitions[optName]

  // for now all flags are common
  yargs.global(optName)

  // check type
  // eg: yargs.boolean(someflag) to ensure that the type is correct
  if (option.type && yargs[option.type]) {
    yargs[option.type](optName)
  }

  if (option.default) {
    yargs.default(optName, option.default)
  }

  if (option.description) {
    yargs.describe(optName, option.description)
  }

  // made by hand for now, we might revisit option this later
  // if (validators[optName]) {
  //   yargs.check(() => {
  //
  //   })
  // }
})

export default yargs
