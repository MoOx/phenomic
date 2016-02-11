import url from "url"
import { join } from "path"

import minimist from "minimist"

const defaultOptions = {
  cwd: process.cwd(),
  source: "content",
  destination: "dist",
  assets: "assets",
  CNAME: false,
  nojekyll: true,
  devHost: "0.0.0.0",
  devPort: "3000",
  verbose: false,
}

const defaultOptionsCLIonly = {
  dev: false,
  production: false,
  static: false,
  server: false,
}

const fieldTypes = {
  "cwd": "string",
  "source": "string",
  "destination": "string",
  "assets": "string",
  "CNAME": "boolean",
  "nojekyll": "boolean",
  "devHost": "string",
  "devPort": "string",
  "dev": "boolean",
  "production": "boolean",
  "static": "boolean",
  "server": "boolean",
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
    else if (fieldTypes[key] !== typeof userConfig[key]) {
      errors.push(
        `Wrong type for '${ key }': expected '${ fieldTypes[key] }', ` +
        `got '${ typeof userConfig[key] }'.`
      )
    }
  })

  const config = minimist(argv, {
    default: {
      ...defaultOptions,
      ...userConfig,
      ...defaultOptionsCLIonly,
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

  if (config.production) {
    if (!pkg.homepage) {
      errors.push(
        "Your package.json require a 'homepage' field."
      )
    }
  }

  const devUrl = `http://${ config.devHost }:${ config.devPort }/`
  const prodBaseUrl = url.parse(pkg.homepage ? pkg.homepage : devUrl)
  config.baseUrl = config.production
    ? prodBaseUrl
    : {
      ...url.parse(devUrl),
      // get base from prod url
      pathname: prodBaseUrl.pathname ? prodBaseUrl.pathname : "/",
    }

  // ensure trailing slash
  if (!config.baseUrl.pathname.endsWith("/")) {
    config.baseUrl.pathname = config.baseUrl.pathname + "/"
  }

  // update config.baseUrl.href since pathname has been updated
  // the usage of the spread operator is to avoid having the "magic" Object
  // returned by node (eg: make assertions difficult)
  config.baseUrl = { ... url.parse(url.format(config.baseUrl)) }

  // Prepare config.assets path and route
  if (config.assets !== undefined) {

    // normalize simple string options
    if (typeof config.assets === "string") {
      config.assets = {
        path: config.assets,
        route: config.assets,
      }
    }

    // adjust path and validate
    if (config.assets.path && config.assets.route) {
      config.assets = {
        path: join(config.cwd, config.source, config.assets.path),
        route: config.assets.route,
      }
    }
    else {
      errors.push(
        "'assets' should be a string, or an object with 2 keys: " +
        "'path' and 'route'"
      )
    }
  }

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
