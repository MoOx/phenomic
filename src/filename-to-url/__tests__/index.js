import test from "tape"

import filenameToUrl from ".."

test("statinamic/lib/filename-to-url", (t) => {

  t.equal(
    filenameToUrl("something/index.md"),
    "something",
    "should transform */index.md path to a simple url"
  )

  t.equal(
    filenameToUrl("something\\index.md"),
    "something",
    "should transform *\\index.md path to a simple url (windows compat)"
  )

  t.equal(
    filenameToUrl("something/index.json"),
    "something",
    "should transform */index.json path to a simple url"
  )

  t.equal(
    filenameToUrl("something-else.md"),
    "something-else",
    "should transform md path to a simple url"
  )

  t.equal(
    filenameToUrl("index.md"),
    "",
    "should transform index.md path to a empty url"
  )

  t.end()
})
