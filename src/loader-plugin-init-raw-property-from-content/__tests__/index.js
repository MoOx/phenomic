import test from "jest-ava-api"

import plugin from ".."

test("should add raw property from content", (t) => {
  t.deepEqual(
    plugin({
      frontMatter: {
        orig: "---\ntitle: blah\n---\n\n# raw",
      },
      result: {},
    }),
    {
      raw: "---\ntitle: blah\n---\n\n# raw",
    }
  )
})
