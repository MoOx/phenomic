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

test("should accept string for 'asset' option", (t) => {
  const config = configurator({
    statinamic: {
      "assets": "AsSeTs",
    },
  })
  t.same(
    config.assets,
    {
      path: join(process.cwd(), config.source, "AsSeTs"),
      route:"AsSeTs",
    }
  )
})

test("should accept true for 'asset' option", (t) => {
  const config = configurator({
    statinamic: {
      "assets": true,
    },
  })
  t.same(
    config.assets,
    {
      path: join(process.cwd(), config.source, "assets"),
      route:"assets",
    }
  )
})

test("should not accept false for 'asset' option", (t) => {
  const config = configurator({ statinamic: { "assets": false } })
  t.is(config.assets, false)
})

test("should not accept null for 'asset' option", (t) => {
  const config = configurator({ statinamic: { "assets": null } })
  t.is(config.assets, null)
})

test("should accept object for 'asset' option", (t) => {
  t.throws(
    () => {
      configurator({ statinamic: { assets: { } } })
    },
    (error) => error.message.includes(
      "You provided an object for 'assets' option."
    )
  )
})
