import test from "ava"

import { join } from "path"
import configurator from ".."
import mockFs from "mock-fs"

test("should accept string", (t) => {
  mockFs({
    [process.cwd() + "/content"]: {
      AsSeT: mockFs.directory({
        mode: 755,
      }),
    },
  })
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

  mockFs.restore()
})

test("should accept true", (t) => {
  mockFs({
    [process.cwd() + "/content"]: {
      assets: mockFs.directory({
        mode: 755,
      }),
    },
  })
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
  mockFs.restore()
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
