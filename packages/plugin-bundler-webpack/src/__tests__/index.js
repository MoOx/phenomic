// @flow

import defaultConfig from "@phenomic/core/lib/defaultConfig.js";

import validate from "../validate.js";

const defaultWebpackConfig = require("../webpack.config.js");

test("validate default config", () => {
  expect(() => {
    validate(defaultWebpackConfig(defaultConfig), defaultConfig);
  }).not.toThrow();
});

test("validate nothing", () => {
  try {
    validate({}, defaultConfig);
    throw new Error("pass but should not");
  } catch (e) {
    expect(e).toMatchSnapshot();
  }
});

test("validate string", () => {
  try {
    validate(
      {
        entry: "App.js",
      },
      defaultConfig,
    );
    throw new Error("pass but should not");
  } catch (e) {
    expect(e).toMatchSnapshot();
  }
});

test("validate array", () => {
  try {
    validate(
      {
        entry: ["something.js", "App.js"],
      },
      defaultConfig,
    );
    throw new Error("pass but should not");
  } catch (e) {
    expect(e).toMatchSnapshot();
  }
});

test("validate object without key", () => {
  try {
    validate(
      {
        entry: {
          stuff: ["something.js", "App.js"],
          thing: ["something.js", "App.js"],
        },
      },
      defaultConfig,
    );
    throw new Error("pass but should not");
  } catch (e) {
    expect(e).toMatchSnapshot();
  }
});
