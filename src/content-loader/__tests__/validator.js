import test from "ava"
import validator from "../validator"

test("should pass if no config provided", () => {
  validator()
})

test("should throw if provide unknow option", (t) => {
  t.throws(
    () => validator({ foo: "bar" }),
    (error) => error.message.includes(`Unknow option 'foo'`)
  )
})

test("should throw if provide wrong type", (t) => {
  t.throws(
    () => validator({ context: false }),
    (error) => error.message.includes(`Wrong type for 'context'`)
  )
})
