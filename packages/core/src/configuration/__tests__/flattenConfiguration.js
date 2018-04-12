// @flow

import { flattenPresets } from "../flattenConfiguration";

function a() {
  return { name: "a" };
}
function b() {
  return { name: "b" };
}
function c() {
  return { name: "c" };
}
function d() {
  return { name: "d" };
}

test("should flatten a list of plugins (array)", () => {
  expect(
    flattenPresets({
      plugins: [a, b]
    })
  ).toMatchSnapshot();
});

test("should flatten a list of plugins (object)", () => {
  expect(
    flattenPresets({
      plugins: { a, b }
    })
  ).toMatchSnapshot();
});

test("should flatten a list of plugins with options (array)", () => {
  expect(
    flattenPresets({
      plugins: [
        [(a: PhenomicPluginModule<PhenomicInputPluginOption>), { option: "-" }],
        b
      ]
    })
  ).toMatchSnapshot();
});

test("should flatten a list of plugins with options (object)", () => {
  expect(
    flattenPresets({
      plugins: {
        a: [
          (a: PhenomicPluginModule<PhenomicInputPluginOption>),
          { option: "-" }
        ],
        b
      }
    })
  ).toMatchSnapshot();
});

test("should flatten a preset (array)", () => {
  expect(
    flattenPresets({
      presets: [
        () => ({
          plugins: [a, b]
        })
      ]
    })
  ).toMatchSnapshot();
});

test("should flatten a preset (object)", () => {
  expect(
    flattenPresets({
      presets: [
        () => ({
          plugins: { a, b }
        })
      ]
    })
  ).toMatchSnapshot();
});

test("should flatten a preset and plugins", () => {
  expect(
    flattenPresets({
      presets: [
        () => ({
          plugins: [a]
        })
      ],
      plugins: [b, c]
    })
  ).toMatchSnapshot();
});

test("should flatten nested presets", () => {
  expect(
    flattenPresets({
      presets: [
        () => ({
          presets: [
            () => ({
              plugins: { a }
            })
          ],
          plugins: [b]
        })
      ],
      plugins: [c, d]
    })
  ).toMatchSnapshot();
});

test("should flatten presets with options (array)", () => {
  expect(
    flattenPresets({
      presets: [
        [
          () => ({
            plugins: { a, b, c }
          }),
          [["a", { option: "-" }]]
        ]
      ]
    })
  ).toMatchSnapshot();
});

test("should flatten presets with options (object)", () => {
  expect(
    flattenPresets({
      presets: [
        [
          () => ({
            plugins: { a, b, c }
          }),
          { a: { option: "-" } }
        ]
      ]
    })
  ).toMatchSnapshot();
});
