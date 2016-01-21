import url from "url"

import minimist from "minimist"
import changeCaseKeys from "change-case-keys"

export default function config(pkg = {}, argv = process.argv) {
  const config = {

    // hardcoded options
    cwd: process.cwd(),
    source: "content",
    destination: "dist",
    CNAME: false,
    nojekyll: true,
    ...changeCaseKeys(pkg.statinamic || {}, "camelize"),

    // CLI options
    dev: false,
    prod: false,
    static: false,
    server: false,
    ...minimist(argv),
  }

  if (config.production) {
    process.env.NODE_ENV = "production"

    if (!pkg.homepage) {
      throw new Error("Your config require a 'homepage' field")
    }
  }

  let baseUrl
  if (config.baseurl) {
    baseUrl = url.parse(config.baseurl)
  }
  else {
    const prodBaseUrl = pkg.homepage ? url.parse(pkg.homepage) : {}
    baseUrl = config.production ? prodBaseUrl : {
      ...url.parse("http://0.0.0.0:3000/"),
      // get base from prod url
      pathname: prodBaseUrl.pathname,
    }
  }

  // ensure trailing slash
  if (!baseUrl.pathname.endsWith("/")) {
    baseUrl.pathname = baseUrl.pathname + "/"
  }

  // update baseUrl.href since pathname has been updated
  baseUrl = url.parse(url.format(baseUrl))

  const consts = {
    ...{
      __DEV__: false,
      __PROD__: false,
      __STATIC__: false,
      __SERVER__: false,
      __DEVTOOLS__: false,
    },
    __BASE_URL__: baseUrl,
    __DEV__: Boolean(config.dev),
    __PROD__: Boolean(config.production),
    __STATIC__: Boolean(config.static),
    __SERVER__: Boolean(config.server),
    __DEVTOOLS__: Boolean(config.devtools),
    ...config.production && {
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    },
  }

  return {
    ...config,
    consts,
    baseUrl,
  }
}
