import test from "ava"; import "babel-core/register"

import filenameToUrl from ".."

test("statinamic/lib/filename-to-url", (t) => {

  t.is(
    filenameToUrl("something/index.md"),
    "something",
    "should transform */index.md path to a simple url"
  )

  t.is(
    filenameToUrl("something\\index.md"),
    "something",
    "should transform *\\index.md path to a simple url (windows compat)"
  )

  t.is(
    filenameToUrl("something/index.json"),
    "something",
    "should transform */index.json path to a simple url"
  )

  t.is(
    filenameToUrl("something-else.md"),
    "something-else",
    "should transform md path to a simple url"
  )

  t.is(
    filenameToUrl("index.md"),
    "",
    "should transform index.md path to a empty url"
  )

  t.is(
    filenameToUrl("some\\thing\\else"),
    "some/thing/else",
    "should handle windows backslash"
  )
})
