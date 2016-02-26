import test from "ava"

import enhanceCollection from ".."

const collec = [
  {
    k: "ey",
    l: "hi",
  },
  {
    k: "ay",
    q: "hu"
  },
  { k: "ei" },
  { k: "eye" },
]

test("filter by object", (t) => {
  t.same(
    enhanceCollection(
      collec,
      {
        filter: { k: "ey" },
      }
    ),
    [
      {
        k: "ey",
        l: "hi",
      },
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
      {
        k: "ey",
        l: "hi",
      },
      {
        k: "ay",
        q: "hu"
      },
    ],
    "should filter by object { key: regexp }"
  )
})

test("filter by custom function", (t) => {
  t.same(
    enhanceCollection(
      collec,
      {
        filter: (t) => t.k === "eye",
      }
    ),
    [
      { k: "eye" },
    ]
  )
})

test("filter by string", (t) => {
  t.same(
    enhanceCollection(
      collec,
      {
        filter: "l",
      }
    ),
    [
      {
        k: "ey",
        l: "hi",
      }
    ],
  )
})

test("multiple filters", (t) => {
  t.same(
    enhanceCollection(
      collec,
      {
        filters: ["q", "k"]
      }
    ),
    [
      {
      k: "ay",
      q: "hu"
      }
    ]
  )
})
