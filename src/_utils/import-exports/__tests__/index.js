import test from "ava"
import { join } from "path"

import importExports from "../index"
const fixtures = {
  common: require.resolve("./fixtures/common.js"),
  babel: require.resolve("./fixtures/babel.js"),
}

const resolvedPaths = {
  common: join(process.cwd(), "fixtures", "common.js"),
  babel: join(process.cwd(), "fixtures", "babel.js"),
}

test("should import exports", (t) => {
  t.deepEqual(
    fixtures,
    resolvedPaths
  )

  t.deepEqual(
    importExports(fixtures),
    {
      common: "COMMON",
      babel: "BABEL",
    }
  )

  t.deepEqual(
    fixtures,
    resolvedPaths
  )
})
