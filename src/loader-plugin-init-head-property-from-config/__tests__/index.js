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

test("should not override existing head", (t) => {
  t.deepEqual(
    plugin({
      result: {
        head: {
          te: "sla",
        },
      },
      options: {
        defaultHead: {
          "tes": "t",
          "te": "st",
        },
      },
    }),
    {
      head: {
        "te": "sla",
        "tes": "t",
      },
    }
  )
})
