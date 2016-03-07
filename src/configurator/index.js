import minimist from "minimist"
import * as options from "./options.js"

const fieldTypes = {
  "cwd": "string",
  "source": "string",
  "destination": "string",
  "assets": true, // accept object, boolean, falsy or string values
  "appcache": true, // accept array, falsy or string values
  "CNAME": "boolean",
  "nojekyll": "boolean",
  "devHost": "string",
  "devPort": "string",
  "dev": "boolean",
  "production": "boolean",
  "static": "boolean",
  "server": "boolean",
  "open": "boolean",
}

const defaultConfig = {
  cwd: process.cwd(),
  source: "content",
  destination: "dist",
  assets: "assets",
  CNAME: false,
  nojekyll: true,
  devHost: "0.0.0.0",
  devPort: "3000",
  verbose: false,
  open: true,
  appcache: false,
}

const defaultConfigCLIonly = {
  dev: false,
  production: false,
  static: false,
  server: false,
}

export default function config(pkg = {}, argv = process.argv) {
  const userConfig = pkg.statinamic || {}

  const errors = []

  // validate user parameters
  Object.keys(userConfig).forEach((key) => {
    if (!fieldTypes[key]) {
      errors.push(
        `Unknow option '${ key }'.`
      )
    }
    else if (
      fieldTypes[key] !== true &&
      fieldTypes[key] !== typeof userConfig[key]
    ) {
      errors.push(
        `Wrong type for '${ key }': expected '${ fieldTypes[key] }', ` +
        `got '${ typeof userConfig[key] }'.`
      )
    }
  })

  const config = minimist(argv, {
    default: {
      ...defaultConfig,
      ...userConfig,
      ...defaultConfigCLIonly,
    },

    // minimist expect 2 array with fields name: string: [], and boolean: []
    ...Object.keys(fieldTypes).reduce((acc, key) => {
      if (!acc[fieldTypes[key]]) {
        acc[fieldTypes[key]] = []
      }
      acc[fieldTypes[key]].push(key)
      return acc
    }, {}),
  })
  delete config._

  // validation/adjustement for each options
  Object.keys(options).forEach((key) => {
    options[key]({
      pkg,
      config,
      defaultConfig,
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
