import url from "../url"

it("should build url for single item", () => {
  expect(
    url({
      collection: "posts",
      id: "test",
    }),
  ).toMatchSnapshot()
})

it("should build url for items by date", () => {
  expect(
    url({
      collection: "posts",
      by: "date",
    }),
  ).toMatchSnapshot()
})

it("should build url for specific tag", () => {
  expect(
    url({
      collection: "posts",
      by: "tag",
      value: "test",
    }),
  ).toMatchSnapshot()

  expect(
    url({
      collection: "posts",
      by: "tag",
      value: "test",
      order: "asc",
    }),
  ).toMatchSnapshot()

  expect(
    url({
      collection: "posts",
      by: "tag",
      value: "test",
      order: "asc",
      limit: 10,
    }),
  ).toMatchSnapshot()

  expect(
    url({
      collection: "posts",
      by: "tag",
      value: "test",
      order: "asc",
      limit: 10,
      after: "BASE64",
    }),
  ).toMatchSnapshot()

  expect(
    url({
      root: "local",
      collection: "posts",
      by: "tag",
      value: "test",
      order: "asc",
      limit: 10,
      after: "BASE64",
    }),
  ).toMatchSnapshot()
})
