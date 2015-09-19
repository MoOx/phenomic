import url from "url"

import minimist from "minimist"

export default function config(pkg = {}, argv = process.argv) {
  argv = {
    dev: false,
    prod: false,
    static: false,
    server: false,
    ...minimist(argv),
  }

  if (argv.production) {
    if (!pkg.homepage) {
      throw new Error(
        "Your package.json require a 'homepage' field"
      )
    }
  }

  let baseUrl
  if (argv.baseurl) {
    baseUrl = url.parse(argv.baseurl)
  }
  else {
    const prodBaseUrl = pkg.homepage ? url.parse(pkg.homepage) : {}
    baseUrl = argv.production ? prodBaseUrl : {
      ...url.parse("http://0.0.0.0:3000/"),
      // get base from prod url
      pathname: prodBaseUrl.pathname,
    }
  }

  // ensure no trailing slash
  if (baseUrl.pathname.endsWith("/")) {
    baseUrl.pathname = baseUrl.pathname.slice(0, baseUrl.pathname.length - 1)
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
    __DEV__: Boolean(argv.dev),
    __PROD__: Boolean(argv.production),
    __STATIC__: Boolean(argv.static),
    __SERVER__: Boolean(argv.server),
    __DEVTOOLS__: Boolean(argv.devtools),
    ...argv.production && {
      "process.env": {
        NODE_ENV: JSON.stringify("production"),
      },
    },
  }

  return {
    ...argv,
    consts,
    baseUrl,
  }
}
