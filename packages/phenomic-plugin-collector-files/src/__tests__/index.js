import { getKey, getSortedKey, getAuthors, getTags } from ".."

it("should be able to generate keys", () => {
  expect(getKey("test", {})).toEqual("test")

  expect(getKey("test.md", {})).toEqual("test")

  // @todo handle this case
  expect(getKey("test/index.md", {})).toEqual(".")
  expect(getKey("test/test/index.md", {})).toEqual("test")

  expect(getKey("test.md", { path: "yep" })).toEqual("yep")
})

it("should be able to generate sort keys", () => {
  expect(getSortedKey("test.md", {})).toEqual("test")

  expect(getSortedKey("test.md", { date: "2010-01-01" })).toEqual(
    "2010-01-01-test",
  )
})

it("should be able to generate authors list", () => {
  expect(getAuthors({ data: { author: "test" } })).toEqual(["test"])

  expect(getAuthors({ data: { authors: ["test", "test2"] } })).toEqual([
    "test",
    "test2",
  ])
})

it("should be able to generate tag list", () => {
  expect(getTags({ data: { tags: ["test", "test2"] } })).toEqual([
    "test",
    "test2",
  ])
})
