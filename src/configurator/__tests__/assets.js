import test from "ava"

import { join } from "path"
import configurator from ".."

test("should accept string for 'asset' option", (t) => {
  const config = configurator(
    {
      phenomic: {
        "assets": "AsSeT",
      },
    },
    []
  )
  t.deepEqual(
    config.assets,
    {
      path: join(process.cwd(), config.source, "AsSeT"),
      route:"AsSeT",
    }
  )
})

test("should accept true for 'asset' option", (t) => {
  const config = configurator(
    {
      phenomic: {
        "assets": true,
      },
    },
    []
  )
  t.deepEqual(
    config.assets,
    {
      path: join(process.cwd(), config.source, "assets"),
      route:"assets",
    }
  )
})

test("should not accept false for 'asset' option", (t) => {
  const config = configurator({ phenomic: { "assets": false } }, [])
  t.is(config.assets, false)
})

test("should not accept null for 'asset' option", (t) => {
  const config = configurator({ phenomic: { "assets": null } }, [])
  t.is(config.assets, null)
})

test("should accept object for 'asset' option", (t) => {
  t.throws(
    () => {
      configurator({ phenomic: { assets: { } } }, [])
    },
    (error) => error.message.includes(
      "You provided an object for 'assets' option."
    )
  )
})
