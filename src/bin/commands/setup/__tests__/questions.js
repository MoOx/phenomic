import test from "ava"
import questions from "../questions"

test("should validate name with only letters, numbers and dashes", (t) => {
  const name = questions.find((q) => q.name === "name")
  t.true(name.validate("foo-bar-BAZ-1-2-3"))
  t.true(typeof name.validate("foo .") === "string")
  t.true(typeof name.validate("BAR 1 .") === "string")
})

test("should validate homepage url", (t) => {
  const homepage = questions.find((q) => q.name === "homepage")
  t.true(homepage.validate("http://foo.bar"))
  t.true(typeof homepage.validate("foo.bar") === "string")
})
