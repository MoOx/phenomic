import test from "ava"; import "babel-core/register"

import toUri from "../index"

test(
  "should transform */index.md path to a simple url",
  (t) => t.is(
    toUri("something/index.md"),
    "something"
  )
)

test(
  "should transform *\\index.md path to a simple url (windows compat)",
  (t) => t.is(
    toUri("something\\index.md"),
    "something"
  )
)

test(
  "should transform md path to a simple url",
  (t) => t.is(
    toUri("something-else.md"),
    "something-else"
  )
)

test(
  "should not transform an html path",
  (t) => t.is(
    toUri("something-else.html"),
    "something-else.html"
  )
)

test(
  "should transform index.md path to a empty url",
  (t) => t.is(
    toUri("index.md"),
    ""
  )
)

test(
  "should handle windows backslash",
  (t) => t.is(
    toUri("some\\thing\\else"),
    "some/thing/else"
  )
)

test(
  "should avoid relative '.' path",
  (t) => {
    t.is(
      toUri("."),
      ""
    )
    t.is(
      toUri("./"),
      ""
    )
    t.is(
      toUri("./stuff"),
      "stuff"
    )
  }
)

test(
  "should remove surrounding slashes",
  (t) => t.is(
    toUri("/some/thing/"),
    "some/thing"
  )
)
