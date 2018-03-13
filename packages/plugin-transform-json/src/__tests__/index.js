import transformJSON from "../index.js";

it("should transform json as json", () => {
  const plugin = transformJSON();
  expect(typeof plugin.transform === "function").toBe(true);
  expect(
    plugin.transform &&
      plugin.transform({
        file: {
          name: "file.json",
          fullpath: "/test/file.json"
          // exists: true,
          // type: "wat"
        },
        contents: new Buffer(
          `{
      "test": "a",
      "test2": "b",
      "somedata": "Normal version"
    }`
        )
      })
  ).toMatchSnapshot();
});

it("should transform json as json and support partial", () => {
  const plugin = transformJSON();
  expect(typeof plugin.transform === "function").toBe(true);
  expect(
    plugin.transform &&
      plugin.transform({
        file: {
          name: "file.json",
          fullpath: "/test/file.json"
          // exists: true,
          // type: "wat"
        },
        contents: new Buffer(
          `{
      "test": "a",
      "test2": "b",
      "somedata": "Normal version",
      "partial": {
        "somedata": "Light version"
      }
    }`
        )
      })
  ).toMatchSnapshot();
});
