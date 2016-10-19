import test from "ava"

import urlify from "../index"

test(
  "should transform */index.md path to a simple url",
  (t) => t.is(
    urlify("something/index.md"),
    "something/"
  )
)

test(
  "should transform *\\index.md path to a simple url (windows compat)",
  (t) => t.is(
    urlify("something\\index.md"),
    "something/"
  )
)

test(
  "should transform md path to a simple url",
  (t) => t.is(
    urlify("something-else.md"),
    "something-else/"
  )
)

test(
  "should not transform an html path",
  (t) => t.is(
    urlify("something-else.html"),
    "something-else.html"
  )
)

test(
  "should transform index.md path to a empty url",
  (t) => t.is(
    urlify("index.md"),
    ""
  )
)

test(
  "should transform index.md path to a empty url (with root)",
  (t) => t.is(
    urlify("/index.md"),
    "/"
  )
)

test(
  "should transform */index.markdown path to a simple url",
  (t) => t.is(
    urlify("something/index.markdown"),
    "something/"
  )
)

test(
  "should transform *\\index.markdown path to a simple url (windows compat)",
  (t) => t.is(
    urlify("something\\index.markdown"),
    "something/"
  )
)

test(
  "should transform md path to a simple url",
  (t) => t.is(
    urlify("something-else.markdown"),
    "something-else/"
  )
)

test(
  "should transform index.markdown path to a empty url",
  (t) => t.is(
    urlify("index.markdown"),
    ""
  )
)

test(
  "should transform index.markdown path to a empty url (with root)",
  (t) => t.is(
    urlify("/index.markdown"),
    "/"
  )
)

test(
  "should handle windows backslash",
  (t) => t.is(
    urlify("some\\thing\\else\\"),
    "some/thing/else/"
  )
)

test(
  "should avoid relative '.' path",
  (t) => {
    t.is(
      urlify("."),
      ""
    )
    t.is(
      urlify("./"),
      ""
    )
    t.is(
      urlify("./stuff"),
      "stuff/"
    )
  }
)

test(
  "should not remove surrounding slashes",
  (t) => t.is(
    urlify("/some/thing/"),
    "/some/thing/"
  )
)
