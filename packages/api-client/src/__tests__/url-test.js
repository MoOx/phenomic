import url from "../url";

it("should build url for single item", () => {
  expect(
    url({
      path: "posts",
      id: "test"
    })
  ).toMatchSnapshot();
});

it("should build url for items by date", () => {
  expect(
    url({
      path: "posts",
      by: "date"
    })
  ).toMatchSnapshot();
});

it("should build url for specific tag", () => {
  expect(
    url({
      path: "posts",
      by: "tag",
      value: "test"
    })
  ).toMatchSnapshot();

  expect(
    url({
      path: "posts",
      by: "tag",
      value: "test",
      order: "asc"
    })
  ).toMatchSnapshot();

  expect(
    url({
      path: "posts",
      by: "tag",
      value: "test",
      order: "asc",
      limit: 10
    })
  ).toMatchSnapshot();

  expect(
    url({
      path: "posts",
      by: "tag",
      value: "test",
      order: "asc",
      limit: 10,
      after: "BASE64"
    })
  ).toMatchSnapshot();

  expect(
    url({
      root: "local",
      path: "posts",
      by: "tag",
      value: "test",
      order: "asc",
      limit: 10,
      after: "BASE64"
    })
  ).toMatchSnapshot();
});
