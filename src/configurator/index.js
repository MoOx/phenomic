import url from "url"
import { join } from "path"
import fs from "fs"
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
  open: true,
  appcache: false,
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
    process.env.NODE_ENV = "production"
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
      pathname: prodBaseUrl.path ? prodBaseUrl.path : "/",
    }

  // ensure trailing slash
  if (!config.baseUrl.pathname.endsWith("/")) {
    config.baseUrl.pathname = config.baseUrl.pathname + "/"
  }

  // update config.baseUrl.href since pathname has been updated
  // the usage of the spread operator is to avoid having the "magic" Object
  // returned by node (eg: make assertions difficult)
  config.baseUrl = { ... url.parse(url.format(config.baseUrl)) }

  // Set basename to process.env for universal usage
  process.env.STATINAMIC_PATHNAME = config.baseUrl.pathname

  // Prepare config.assets path and route
  if (config.assets) {

    // normalize simple string options
    if (typeof config.assets === "function") {
      errors.push(
        "You provided an function for 'assets' option." +
        "This option accept a boolean value, a string, or an object."
      )
    }
    else if (
        typeof config.assets === "object" &&
        (
          typeof config.assets.path !== "string" ||
          typeof config.assets.route !== "string"
        )
    ) {
      errors.push(
        "You provided an object for 'assets' option." +
        "You need to provide 2 keys: " +
        "'path' (string, path of your assets, relative to 'source') " +
        "and 'route' (string, path of your assets folder in the destination)." +
        "\n" +
        "You provided the following keys: " +
        Object.keys(config.assets).map(
          (k) => `'${ k }' (${ typeof config.assets[k] })`
        )
      )
    }
    else {
      if (typeof config.assets === "string") {
        config.assets = {
          path: config.assets,
          route: config.assets,
        }
      }
      else if (typeof config.assets === "boolean") {
        // === true
        config.assets = {
          path: defaultOptions.assets,
          route: defaultOptions.assets,
        }
      }

      // adjust path and validate
      config.assets = {
        path: join(config.cwd, config.source, config.assets.path),
        route: config.assets.route,
      }

      // Test folder
      try {
        const stats = fs.lstatSync(config.assets.path)
        if (!stats.isDirectory()) {
          // Just throw a dump error
          throw new Error("This is not a folder")
        }
      }
      catch (e) {
        errors.push(
          config.assets.path +
          " doesn't exist or isn't a folder. " +
          "Please check your 'assets' configuration. " +
          "Note that if you don't need this option, " +
          "you can set it up to `false`."
        )
      }
    }
  }

  if (typeof config.appcache === "string") {
    config.appcache = [ config.appcache ]
  }
  // Default value if set true
  else if (typeof config.appcache === "boolean" && config.appcache) {
    config.appcache = [ "**/*.*", "!**/*.html", "index.html" ]
  }
  else if (config.appcache === null) {
    config.appcache = false
  }
  else if (
    !Array.isArray(config.appcache) &&
    typeof config.appcache !== "boolean"
  ) {
    errors.push(
      `You provided an '${ typeof config.appcache }' for 'appcache' option. ` +
      `This option accepts a boolean value, a string, or an array.`
    )
  }

  // Disable appcache for development
  if (config.dev) {
    config.appcache = false
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
