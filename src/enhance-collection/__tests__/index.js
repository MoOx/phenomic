import tape from "tape"

import enhanceCollection from ".."

tape("statinamic/lib/enhance-collection", (test) => {

  const collec = [
    { k: "ey" },
    { k: "ay" },
    { k: "ei" },
    { k: "eye" },
  ]

  test.deepEqual(
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

  test.deepEqual(
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

  test.end()
})
