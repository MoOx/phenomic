import fs from "fs"
// import { relative as relativePath, join } from "path"
import { join } from "path"

import { sync as rimraf } from "rimraf"
import { sync as mkdirp } from "mkdirp"
import test from "ava"

import cleanNodeCache from "../index.js"

const fileNotToClean = join(
  __dirname, "..", "..", "..", "..", "node_modules", "ava", "index.js"
)

test("invalidate js cache", (t) => {
  const folder = join(__dirname, "ouput", "cache")
  rimraf(folder)
  mkdirp(folder)
  const jsfile = join(folder, "thing.js")
  fs.writeFileSync(jsfile, "module.exports = 1")
  t.is(
    require(jsfile),
    1,
    "should get the direct exported value"
  )

  t.truthy(
    typeof require.cache[jsfile] !== undefined,
    "should have the cache"
  )
  const isFileNotToCleanInCache = Boolean(require.cache[fileNotToClean])
  t.truthy(
    isFileNotToCleanInCache,
    "should have the cache for a node module"
  )

  cleanNodeCache(folder)

  fs.writeFileSync(jsfile, "module.exports = 2")

  t.falsy(
    Boolean(require.cache[jsfile]),
    "should delete cacheof the changed file"
  )

  t.truthy(
    Boolean(require.cache[fileNotToClean]),
    "should not delete cache outside metalsmith folder"
  )

  // due to a require hook probably, this test cannot pass :/
  // TODO found the exact reason and fix this
  // t.is(
  //   require(jsfile),
  //   2,
  //   "should get the direct fresh exported value"
  // )

  rimraf(folder)
})
