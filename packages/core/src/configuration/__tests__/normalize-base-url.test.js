import normalizeBaseUrl from "../normalize-base-url.js";

it("should normalize base url with a trailing slash", () => {
  expect(normalizeBaseUrl("http://t.e/st")).toMatchSnapshot();
});
