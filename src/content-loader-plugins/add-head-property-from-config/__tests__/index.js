import test from "ava"

import plugin from ".."

test("should add head property from config", (t) => {
  t.deepEqual(
    plugin({
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
