// @flow

import { encode, decode } from "../QueryString";

it("should encode query string", () => {
  expect(encode({ a: "1", b: "foo" })).toMatchSnapshot();
});

it("should decode query string", () => {
  expect(decode("a=1&b=foo")).toMatchSnapshot();

  expect(decode("?a=1&b=foo")).toEqual(decode("a=1&b=foo"));
});
