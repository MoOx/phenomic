import test from "ava"

import enhanceCollection from ".."

const collec = [
  { k: "ey", l: "hi" },
  { k: "ey", l: [ "a", "b" ] },
  { k: "ay", q: "hu" },
  { k: "ei" },
  { k: "eye" },
  { q: "uh" },
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
      { k: "ey", l: "hi" },
      { k: "ey", l: [ "a", "b" ] },
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
      { k: "ey", l: "hi" },
      { k: "ey", l: [ "a", "b" ] },
      { k: "ay", q: "hu" },
    ],
    "should filter by object { key: regexp }"
  )
})

test("filter by custom function", (t) => {
  t.same(
    enhanceCollection(
      collec,
      {
        filter: (item) => item.k === "eye",
      }
    ),
    [
      { k: "eye" },
    ]
  )
})

test("filter by custom function (and warn if not boolean)", (t) => {
  const messages = []
  t.same(
    enhanceCollection(
      collec,
      {
        filter: (item) => item.k && item.k.indexOf("eye") + 1,
      },
      // console
      { warn: (msg) => messages.push(msg) },
    ),
    [
      { k: "eye" },
    ]
  )
  t.ok(messages.length > 0)
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
      { k: "ey", l: "hi" },
      { k: "ey", l: [ "a", "b" ] },
    ],
  )
})

test("multiple filters", (t) => {
  t.same(
    enhanceCollection(
      collec,
      {
        filters: [ "q", "k" ],
      }
    ),
    [
      { k: "ay", q: "hu" },
    ]
  )
})

test("mix filters ", (t) => {
  t.same(
    enhanceCollection(
      collec,
      {
        filters: [
          { k: /y$/ },
          "l",
          (item) => Array.isArray(item.l),
        ],
      }
    ),
    [
      { k: "ey", l: [ "a", "b" ] },
    ]
  )
})
