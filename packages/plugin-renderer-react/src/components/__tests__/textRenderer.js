/* eslint-disable react/no-multi-comp */

import textRenderer from "../textRenderer";

test("textRenderer tells you when pass undefined", () => {
  const spy = jest.spyOn(console, "error");
  expect(textRenderer()).toMatchSnapshot();
  expect(spy).toHaveBeenCalled();
});

test("textRenderer works with raw html", () => {
  expect(textRenderer("<h1>Test</h1")).toMatchSnapshot();
});

test("textRenderer works with phenomic json body", () => {
  expect(
    textRenderer({
      t: "p",
      p: { className: "test" },
      c: [
        {
          t: "a",
          p: { href: "http://test" },
          c: "Link"
        },
        " ",
        {
          t: "span",
          c: "text"
        },
        " ",
        {
          t: "strong",
          c: "fat"
        }
      ]
    })
  ).toMatchSnapshot();
});
