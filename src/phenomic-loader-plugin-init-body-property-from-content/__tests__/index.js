import test from "ava"

import plugin from ".."

test("should add body property from content", (t) => {
  t.deepEqual(
    plugin({
      frontMatter: {
        content: "foo",
      },
      result: {},
    }),
    {
      body: "foo",
    }
  )
})
