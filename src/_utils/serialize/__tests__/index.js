import test from "jest-ava-api"

import serializer from ".."

test("serialize JS for HTML", (t) => {
  const escaped = serializer("<script></script><script></script>")
  t.is(
    escaped,
    "\"<script><\\/script><script><\\/script>\"",
    "function should escape all end of script tag"
  )
  t.falsy(
    escaped.includes("</script>"),
    "result should not contain unescaped end of script tag"
  )
})

/* serialize-javascript version
test("serialize JS object", (t) => {
  const serialized = serializer("<script></script><script></script>")
  t.is(
    serialized,
    "\"\\u003Cscript\\u003E\\u003C\\u002Fscript\\u003E" +
      "\\u003Cscript\\u003E\\u003C\\u002Fscript\\u003E\"",
    "function should escape all end of script tag"
  )
  t.falsy(
    serialized.includes("</script>"),
    "result should not contain unescaped end of script tag"
  )
})
*/

// https://github.com/MoOx/phenomic/issues/397
// blocked by
// https://github.com/MoOx/phenomic/issues/434
// and also
// https://github.com/yahoo/serialize-javascript/pull/16
/*
test("keep date", (t) => {
  const ISODate = "2016-04-28T22:02:17.156Z"
  t.is(
    serializer({ d: new Date(ISODate) }),
    `{"d":new Date("${ ISODate }")}`,
  )
})
*/
