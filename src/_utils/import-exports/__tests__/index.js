import test from "ava"; import "babel-core/register"
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
  t.same(
    fixtures,
    resolvedPaths
  )

  t.same(
    importExports(fixtures),
    {
      common: "COMMON",
      babel: "BABEL",
    }
  )

  t.same(
    fixtures,
    resolvedPaths
  )
})
