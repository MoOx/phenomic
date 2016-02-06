import test from "ava"; import "babel-core/register"

import filenameToUrl from "../index"

test(
  "should transform */index.md path to a simple url",
  (t) => t.is(
    filenameToUrl("something/index.md"),
    "something"
  )
)

test(
  "should transform *\\index.md path to a simple url (windows compat)",
  (t) => t.is(
    filenameToUrl("something\\index.md"),
    "something"
  )
)

test(
  "should transform */index.json path to a simple url",
  (t) => t.is(
    filenameToUrl("something/index.json"),
    "something"
  )
)

test(
  "should transform md path to a simple url",
  (t) => t.is(
    filenameToUrl("something-else.md"),
    "something-else"
  )
)

test(
  "should transform index.md path to a empty url",
  (t) => t.is(
    filenameToUrl("index.md"),
    ""
  )
)

test(
  "should handle windows backslash",
  (t) => t.is(
    filenameToUrl("some\\thing\\else"),
    "some/thing/else"
  )
)

test(
  "should avoid relative '.' path",
  (t) => {
    t.is(
      filenameToUrl("."),
      ""
    )
    t.is(
      filenameToUrl("./"),
      ""
    )
    t.is(
      filenameToUrl("./stuff"),
      "stuff"
    )
  }
)

test(
  "should remove surrounding slashes",
  (t) => t.is(
    filenameToUrl("/some/thing/"),
    "some/thing"
  )
)
