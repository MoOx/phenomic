import test from "ava"
import redbox from ".."

test("render redbox", (t) => {
  const err = new Error("Error message")
  const result = redbox(err)
  t.regex(result, /Error message/)
  t.regex(result, /^(<!doctype html><html><body>)/)
  t.regex(result, /<\/body><\/html>$/)
})
