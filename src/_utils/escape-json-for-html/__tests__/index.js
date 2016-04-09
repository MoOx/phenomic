import test from "ava"

import escapeJSONforHTML from ".."

test("escape JSON for HTML", (t) => {
  const escaped = escapeJSONforHTML("<script></script><script></script>")
  t.is(
    escaped,
    "<script><\\/script><script><\\/script>",
    "function should escape all end of script tag"
  )
  t.falsy(
    escaped.includes("</script>"),
    "result should not contain unescaped end of script tag"
  )
})
