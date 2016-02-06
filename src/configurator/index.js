import url from "url"
import { join } from "path"

import minimist from "minimist"
import changeCaseKeys from "change-case-keys"

export default function config(pkg = {}, argv = process.argv) {
  const config = {
    pkg,

    // default options
    cwd: process.cwd(),
    source: "content",
    destination: "dist",
    assets: "assets",
    CNAME: false,
    nojekyll: true,
    devHost: "0.0.0.0",
    devPort: "3000",
    verbose: false,

    // user config options
    ...changeCaseKeys(pkg.statinamic || {}, "camelize"),

    // CLI only options
    dev: false,
    production: false,
    static: false,
    server: false,

    // user CLI only options
    ...minimist(argv, {
      alias: {
        "dev-host": "devHost",
        "dev-port": "devPort",
      },

      // TODO validate string and flags after, so values from pkg.json are
      // validated too
      string: [
        "cwd",
        "source",
        "destination",
        "assets",
        "devHost",
        "devPort",
      ],
      boolean: [
        "CNAME",
        "nojekyll",
        "dev",
        "production",
        "static",
        "server",
      ],
    }),
  }

  if (config.production) {
    if (!pkg.homepage) {
      throw new Error(
        "Your config require a 'homepage' field. " +
        "See 'Configuration' section in documentation."
      )
    }
  }

  if (config.baseurl) {
    config.baseUrl = url.parse(config.baseurl)
  }
  else {
    const prodBaseUrl = pkg.homepage ? url.parse(pkg.homepage) : {}
    config.baseUrl = config.production ? prodBaseUrl : {
      ...url.parse(`http://${ config.devHost }:${ config.devPort }/`),
      // get base from prod url
      pathname: prodBaseUrl.pathname,
    }
  }

  // ensure trailing slash
  if (!config.baseUrl.pathname.endsWith("/")) {
    config.baseUrl.pathname = config.baseUrl.pathname + "/"
  }

  // update config.baseUrl.href since pathname has been updated
  config.baseUrl = url.parse(url.format(config.baseUrl))

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
      throw new TypeError (
        "'assets' should be a string, or an object with 2 keys: " +
        "'path' and 'route'"
      )
    }
  }

  return config
}
