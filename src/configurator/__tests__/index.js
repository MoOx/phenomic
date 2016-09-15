import { join } from "path"

import test from "jest-ava-api"

import configurator from ".."

test("should return a default configuration", (t) => {
  const config = configurator()

  const expected = {
    cwd: __dirname,
    source: "content",
    destination: "dist",
    assets: {
      path: join(__dirname, "content", "assets"),
      route: "assets",
    },
    CNAME: false,
    nojekyll: true,
    devHost: "0.0.0.0",
    devPort: 3333,
    offline: false,
    forceOffline: false,
    "force-offline": false,
    verbose: false,
    open: true,
    cache: false,
    dev: false,
    production: false,
    static: false,
    server: false,
    baseUrl: {
      protocol: "http:",
      slashes: true,
      auth: null,
      host: "0.0.0.0:3333",
      port: "3333",
      hostname: "0.0.0.0",
      hash: null,
      search: null,
      query: null,
      pathname: "/",
      path: "/",
      href: "http://0.0.0.0:3333/",
    },
  }

  t.deepEqual(
    config,
    expected
  )
})

test("should allow to override some default values", (t) => {
  const config = configurator({
    pkg: {
      phenomic: {
        "CNAME": true,
        "devPort": 2000,
      },
    },
    argv: [ "--devHost=1.2.3.4" ],
  })

  t.is(config.CNAME, true)
  t.is(config.devPort, 2000)
  t.is(config.devHost, "1.2.3.4")
})

test("should warn if config is invalid", (t) => {
  process.env.TESTING = "1"
  t.throws(
    () => configurator({
      pkg: {
        phenomic: {
          lol: true,
        },
      },
    }),
    (error) => error.message.includes("Unknow option 'lol'.")
  )
})

test("should warn if config is invalid when '--production' is used", (t) => {
  process.env.TESTING = "1"
  t.throws(
    () => {
      configurator({
        argv: [ "--production" ],
      })
    },
    (error) => error.message.includes("Your package.json require a 'homepage'")
  )
})

test("should not warn if config is valid when '--production' is used", (t) => {
  process.env.NODE_ENV = undefined
  const config = configurator({
    pkg: { homepage: "http://te.st/" },
    argv: [ "--production" ],
  })
  t.is(config.baseUrl.href, "http://te.st/")
})

test("should adjust 'NODE_ENV' when '--production' is used", (t) => {
  process.env.NODE_ENV = undefined
  configurator({
    pkg: { homepage: "http://a.b/" },
    argv: [ "--production" ],
  })
  t.is(process.env.NODE_ENV, "production")
})
