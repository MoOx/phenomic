import test from "ava"; import "babel-core/register"

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
    devPort: "3000",
    verbose: false,
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
  }

  t.same(
    config,
    expected
  )
})

test("should allow to override some default values", (t) => {
  const config = configurator(
    {
      statinamic: {
        "CNAME": true,
        "devPort": "2000",
      },
    },
    [ "--devHost=1.2.3.4" ]
  )

  t.is(config.CNAME, true)
  t.is(config.devPort, "2000")
  t.is(config.devHost, "1.2.3.4")
})

test("should warn if config is invalid", (t) => {

  t.throws(
    () => {
      configurator({
        statinamic: {
          "lol": true,
        },
      })
    },
    (error) => error.message.includes("Unknow option 'lol'.")
  )
})

test("should warn if config is invalid", (t) => {

  t.throws(
    () => {
      configurator({}, [ "--production" ])
    },
    (error) => error.message.includes("Your package.json require a 'homepage'")
  )
})
