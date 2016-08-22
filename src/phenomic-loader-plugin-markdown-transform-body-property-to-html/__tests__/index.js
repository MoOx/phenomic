import test from "ava"

import plugin from ".."

test("should add raw property from content", (t) => {
  t.deepEqual(
    plugin({
      result: {
        body: "# raw",
      },
    }),
    {
      body:
        "<h1 id=\"raw\"><a href=\"#raw\" class=\"phenomic-HeadingAnchor\">#" +
        "</a>raw</h1>\n",
    }
  )
})
