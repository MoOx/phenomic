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

test("sort with a field name", (t) => {
  t.deepEqual(
    enhanceCollection(
      collec,
      {
        sort: "k",
      }
    ),
    [
      { q: "uh" },
      { k: "ay", q: "hu" },
      { k: "ei" },
      { k: "ey", l: "hi" },
      { k: "ey", l: [ "a", "b" ] },
      { k: "eye" },
    ]
  )
})

test("sort with a custom function", (t) => {
  t.deepEqual(
    enhanceCollection(
      collec,
      {
        sort: (a, b) => {
          a = a["k"]
          b = b["k"]
          if (!a && !b) return 0
          if (!a) return -1
          if (!b) return 1
          if (b > a) return -1
          if (a > b) return 1
          return 0
        },
      }
    ),
    [
      { q: "uh" },
      { k: "ay", q: "hu" },
      { k: "ei" },
      { k: "ey", l: "hi" },
      { k: "ey", l: [ "a", "b" ] },
      { k: "eye" },
    ]
  )
})

test("reverse", (t) => {
  t.deepEqual(
    enhanceCollection(
      collec,
      {
        reverse: true,
      }
    ),
    [
      { q: "uh" },
      { k: "eye" },
      { k: "ei" },
      { k: "ay", q: "hu" },
      { k: "ey", l: [ "a", "b" ] },
      { k: "ey", l: "hi" },
    ]
  )
})

test("limit", (t) => {
  t.deepEqual(
    enhanceCollection(
      collec,
      {
        limit: 1,
      }
    ),
    [
      { k: "ey", l: "hi" },
    ]
  )
})

test("addSiblingReferences", (t) => {
  const collec = [
    { k: 1 },
    { k: 2 },
    { k: 3 },
  ]

  t.deepEqual(
    enhanceCollection(
      collec,
      {
        addSiblingReferences: true,
      }
    ),
    [
      {
        k: 1,
        next: { k: 2 },
      },
      {
        k: 2,
        previous: { k: 1 },
        next: { k: 3 },
      },
      {
        k: 3,
        previous: { k: 2 },
      },
    ]
  )
})
