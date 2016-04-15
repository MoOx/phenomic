import test from "ava"

import { join } from "path"
import configurator from ".."

test("should return a default configuration", (t) => {
  const config = configurator({}, [])

  const expected = {
    cwd: process.cwd(),
    source: "content",
    destination: "dist",
    assets: {
      path: join(process.cwd(), "content", "assets"),
      route: "assets",
    },
    CNAME: false,
    nojekyll: true,
    devHost: "0.0.0.0",
    devPort: 3000,
    offline : false,
    verbose: false,
    open: true,
    dev: false,
    production: false,
    static: false,
    server: false,
    baseUrl: {
      protocol: "http:",
      slashes: true,
      auth: null,
      host: "0.0.0.0:3000",
      port: "3000",
      hostname: "0.0.0.0",
      hash: null,
      search: null,
      query: null,
      pathname: "/",
      path: "/",
      href: "http://0.0.0.0:3000/",
    },
    // deprecated
    appcache: undefined,
  }

  t.deepEqual(
    config,
    expected
  )
})

test("should allow to override some default values", (t) => {
  const config = configurator(
    {
      phenomic: {
        "CNAME": true,
        "devPort": 2000,
      },
    },
    [ "--devHost=1.2.3.4" ]
  )

  t.is(config.CNAME, true)
  t.is(config.devPort, 2000)
  t.is(config.devHost, "1.2.3.4")
})

test("should warn if config is invalid", (t) => {
  t.throws(
    () => {
      configurator(
        {
          phenomic: {
            "lol": true,
          },
        },
        []
      )
    },
    (error) => error.message.includes("Unknow option 'lol'.")
  )
})

test("should warn if config is invalid when '--production' is used", (t) => {
  t.throws(
    () => {
      configurator({}, [ "--production" ])
    },
    (error) => error.message.includes("Your package.json require a 'homepage'")
  )
})

test("should not warn if config is valid when '--production' is used", (t) => {
  process.env.NODE_ENV = undefined
  const config = configurator({ homepage: "http://te.st/" }, [ "--production" ])
  t.is(config.baseUrl.href, "http://te.st/")
})

test("should adjust 'NODE_ENV' when '--production' is used", (t) => {
  process.env.NODE_ENV = undefined
  configurator({ homepage: "http://a.b/" }, [ "--production" ])
  t.is(process.env.NODE_ENV, "production")
})
