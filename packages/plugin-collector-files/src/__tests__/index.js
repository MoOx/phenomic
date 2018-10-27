// @flow

import { makeId, getFieldValue, injectData, parsePath } from "..";

it("should be able to generate keys", () => {
  expect(makeId("test", { partial: {}, data: {} })).toEqual("test");

  expect(makeId("test.md", { partial: {}, data: {} })).toEqual("test");

  // @todo handle this case
  expect(makeId("test/index.md", { partial: {}, data: {} })).toEqual("test");
  expect(makeId("test/test/index.md", { partial: {}, data: {} })).toEqual(
    "test/test",
  );
  expect(makeId("test\\test\\index.md", { partial: {}, data: {} })).toEqual(
    "test/test",
  );

  expect(makeId("test.md", { partial: {}, data: { path: "yep" } })).toEqual(
    "yep",
  );
});

it("should be able to generate fields lists from arrays", () => {
  expect(
    getFieldValue({ partial: {}, data: { tags: ["test", "test2"] } }, "tags"),
  ).toEqual(["test", "test2"]);
});

it("should be able to generate fields lists from strings", () => {
  expect(
    getFieldValue({ partial: {}, data: { tags: "test" } }, "tags"),
  ).toEqual(["test"]);
});

it("should be able to generate fields lists from numbers", () => {
  expect(getFieldValue({ partial: {}, data: { tags: 2 } }, "tags")).toEqual([
    2,
  ]);
});

it("should be able to generate fields lists from booleans", () => {
  expect(getFieldValue({ partial: {}, data: { tags: false } }, "tags")).toEqual(
    [false],
  );
});

it("should be able to inject date from filename in data", () => {
  expect(injectData("2010-01-13-test.md", { partial: {}, data: {} })).toEqual({
    partial: {
      date: "2010-01-13",
      filename: "2010-01-13-test.md",
    },
    data: {
      date: "2010-01-13",
      filename: "2010-01-13-test.md",
    },
  });
  expect(injectData("test.md", { partial: {}, data: {} })).toEqual({
    partial: {
      filename: "test.md",
    },
    data: {
      filename: "test.md",
    },
  });
});

it("should be able to parse filepath", () => {
  expect(parsePath("posts/november/2017-11-11-test.md")).toEqual({
    name: "2017-11-11-test.md",
    allPaths: ["posts", "posts/november", "posts/november/2017-11-11-test.md"],
  });
});
