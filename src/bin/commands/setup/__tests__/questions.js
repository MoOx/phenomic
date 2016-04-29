import test from "ava"
import questions, { validateUrl } from "../questions"

test("should validate name with only letters, numbers and dashes", (t) => {
  const validate = questions.find((q) => q.name === "name").validate
  t.true(validate("foo-bar-BAZ-1-2-3"))
  t.true(typeof validate("foo .") === "string")
  t.true(typeof validate("BAR 1 .") === "string")
})

test("should validate url", (t) => {
  t.true(validateUrl("http://foo.bar"))
  t.true(typeof validateUrl("foo.bar") === "string")
})

test("should validate twitter username", (t) => {
  const validate = questions.find((q) => q.name === "twitter").validate
  t.true(validate("Phenomic_app"))
  t.true(typeof validate("Phenomic app") === "string")
})
