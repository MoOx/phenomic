import test from "ava"

import plugin from ".."

test("should add rawBody property from content", (t) => {
  t.deepEqual(
    plugin({
      frontMatter: {
        content: "# raw",
      },
      result: {},
    }),
    {
      rawBody: "# raw",
    }
  )
})
