import test from "ava"; import "babel-core/register"

import enhanceCollection from ".."

test("statinamic/lib/enhance-collection", (t) => {

  const collec = [
    { k: "ey" },
    { k: "ay" },
    { k: "ei" },
    { k: "eye" },
  ]

  t.same(
    enhanceCollection(
      collec,
      {
        filter: { k: "ey" },
      }
    ),
    [
      { k: "ey" },
    ],
    "should filter by object { key: string }"
  )

  t.same(
    enhanceCollection(
      collec,
      {
        filter: { k: /y$/ },
      }
    ),
    [
      { k: "ey" },
      { k: "ay" },
    ],
    "should filter by object { key: regexp }"
  )
})
