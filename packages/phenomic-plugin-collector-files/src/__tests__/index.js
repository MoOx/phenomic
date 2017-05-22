import {
  getKey,
  getSortedKey,
  getAuthors,
  getFields,
  getFieldValue,
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

it("should be able to get arbitrary fields", () => {
  expect(
    getFields({ partial: {}, data: { tags: ["test", "test2"] } }),
  ).toEqual(["tags"])
})

it("should be able to generate fields lists from arrays", () => {
  expect(
    getFieldValue({ partial: {}, data: { tags: ["test", "test2"] } }, "tags"),
  ).toEqual(["test", "test2"])
})

it("should be able to generate fields lists from strings", () => {
  expect(
    getFieldValue({ partial: {}, data: { tags: "test" } }, "tags"),
  ).toEqual(["test"])
})

it("should be able to generate fields lists from numbers", () => {
  expect(getFieldValue({ partial: {}, data: { tags: 2 } }, "tags")).toEqual([2])
})

it("should be able to generate fields lists from booleans", () => {
  expect(
    getFieldValue({ partial: {}, data: { tags: false } }, "tags"),
  ).toEqual([false])
})

it("should be able to inject date from filename in data", () => {
  expect(
    injectDateFromFilename("2010-01-13-test.md", { partial: {}, data: {} }),
  ).toEqual({ partial: { date: "2010-01-13" }, data: { date: "2010-01-13" } })
  expect(injectDateFromFilename("test.md", { partial: {}, data: {} })).toEqual({
    partial: {},
    data: {},
  })
})
