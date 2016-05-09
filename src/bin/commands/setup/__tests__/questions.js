import test from "ava"
import questions from "../questions"

const getQuestion = (name) => questions.find((q) => q.name === name)

test("should validate name with only letters, numbers and dashes", (t) => {
  const { validate } = getQuestion("name")
  t.true(validate("foo-bar-BAZ-1-2-3"))
  t.true(typeof validate("foo .") === "string")
  t.true(typeof validate("BAR 1 .") === "string")
})

test("should validate homepage url", (t) => {
  const { validate } = getQuestion("homepage")
  t.true(validate("http://foo.bar"))
  t.is(typeof validate("foo.bar"), "string")
})

test("should validate repository username", (t) => {
  const { validate } = getQuestion("repository")
  t.true(validate(""), "should accept optional value (so empty value)")
  t.true(validate("https://github.com/a/b.git"), "should accept valid value")
  t.is(typeof validate("not an url"), "string",
    "should not accept invalid value")
})

test("should validate twitter username", (t) => {
  const { validate } = getQuestion("twitter")
  t.true(validate(""), "should accept optional value (so empty value)")
  t.true(validate("Phenomic_app"), "should accept valid value")
  t.is(typeof validate("Phenomic app"), "string",
    "should not accept invalid value")
})
