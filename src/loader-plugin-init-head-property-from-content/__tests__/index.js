import test from "jest-ava-api"

import plugin from ".."

test("should add head property from content", (t) => {
  t.deepEqual(
    plugin({
      frontMatter: {
        data: {
          "te": "st",
        },
      },
      result: {},
      options: {
        defaultHead: {
          "te": "st",
        },
      },
    }),
    {
      head: {
        "te": "st",
      },
    }
  )
})
