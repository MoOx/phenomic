import { join } from "path"

import test from "ava"

import { testConfig } from ".."

test("should throws when for an invalid folder", (t) => {
  t.throws(
    () => {
      testConfig({ assets: "foo" })
    },
    (error) => error.message.includes(
      "doesn't exist or isn't a folder"
    )
  )
})

test("should accept string", (t) => {
  const config = testConfig({ "assets": "AsSeT" })
  t.deepEqual(
    config.assets,
    {
      path: join(process.cwd(), config.source, "AsSeT"),
      route:"AsSeT",
    }
  )
})

test("should accept true", (t) => {
  const config = testConfig({ "assets": true })
  t.deepEqual(
    config.assets,
    {
      path: join(process.cwd(), config.source, "assets"),
      route:"assets",
    }
  )
})

test("should accept false", (t) => {
  const config = testConfig({ "assets": false })
  t.is(config.assets, false)
})

test("should accept null", (t) => {
  const config = testConfig({ "assets": null })
  t.is(config.assets, null)
})

test("should not accept object without `route` and `path` keys", (t) => {
  t.throws(
    () => {
      testConfig({ assets: { } })
    },
    (error) => error.message.includes(
      "You provided an object for 'assets' option."
    )
  )
})
