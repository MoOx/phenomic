import test from "ava"

test("should throw if trying to require statinamic directly", (t) => {
  t.throws(
    () => {
      require("..")
    },
    (error) => error.message.includes(
      "Please use submodules directly (e.g.: 'statinamic/lib/client')"
    )
  )
})
