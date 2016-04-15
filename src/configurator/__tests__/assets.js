import test from "ava"

import { join } from "path"
import configurator from ".."

test("should throws when for an invalid folder", (t) => {
  t.throws(
    () => {
      configurator({ phenomic: { assets: "foo" } }, [])
    },
    (error) => error.message.includes(
      "doesn't exist or isn't a folder"
    )
  )
})

test("should accept string", (t) => {
  const config = configurator({ phenomic: { "assets": "AsSeT" } }, [])
  t.deepEqual(
    config.assets,
    {
      path: join(process.cwd(), config.source, "AsSeT"),
      route:"AsSeT",
    }
  )
})

test("should accept true", (t) => {
  const config = configurator({ phenomic: { "assets": true } }, [])
  t.deepEqual(
    config.assets,
    {
      path: join(process.cwd(), config.source, "assets"),
      route:"assets",
    }
  )
})

test("should accept false", (t) => {
  const config = configurator({ phenomic: { "assets": false } }, [])
  t.is(config.assets, false)
})

test("should accept null", (t) => {
  const config = configurator({ phenomic: { "assets": null } }, [])
  t.is(config.assets, null)
})

test("should not accept object without `route` and `path` keys", (t) => {
  t.throws(
    () => {
      configurator({ phenomic: { assets: { } } }, [])
    },
    (error) => error.message.includes(
      "You provided an object for 'assets' option."
    )
  )
})
