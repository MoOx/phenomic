import {
  getKey,
  getSortedKey,
  getAuthors,
  getTags,
  injectDateFromFilename,
} from ".."

it("should be able to generate keys", () => {
  expect(getKey("test", { partial: {}, data: {} })).toEqual("test")

  expect(getKey("test.md", { partial: {}, data: {} })).toEqual("test")

  // @todo handle this case
  expect(getKey("test/index.md", { partial: {}, data: {} })).toEqual(".")
  expect(getKey("test/test/index.md", { partial: {}, data: {} })).toEqual(
    "test",
  )

  expect(getKey("test.md", { partial: {}, data: { path: "yep" } })).toEqual(
    "yep",
  )
})

it("should be able to generate sort keys", () => {
  expect(getSortedKey("test.md", { partial: {}, data: {} })).toEqual("test")

  expect(
    getSortedKey("test.md", { partial: {}, data: { date: "2010-01-01" } }),
  ).toEqual("2010-01-01-test")
})

it("should be able to generate authors list", () => {
  expect(getAuthors({ partial: {}, data: { author: "test" } })).toEqual([
    "test",
  ])

  expect(
    getAuthors({ partial: {}, data: { authors: ["test", "test2"] } }),
  ).toEqual(["test", "test2"])
})

it("should be able to generate tag list", () => {
  expect(getTags({ partial: {}, data: { tags: ["test", "test2"] } })).toEqual([
    "test",
    "test2",
  ])
})
