import test from "ava"

import sortAssets from "../sortAssets"

test("sortAssets", (t) => {
  const assets = {
    "foo": [
      "5.js",
      "1.js",
      "1.css",
    ],
    "bar": [
      "3.css",
      "3.js",
    ],
  }

  t.deepEqual(
    sortAssets(assets),
    {
      js: [ "1.js", "3.js", "5.js" ],
      css: [ "1.css", "3.css" ],
    }
  )
})
