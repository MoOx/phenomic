import transformMarkdown from "../index.js";

it("should transform markdown as html", () => {
  const plugin = transformMarkdown();
  expect(typeof plugin.transform === "function").toBe(true);
  expect(
    plugin.transform &&
      plugin.transform({
        file: {
          name: "file.json",
          fullpath: "/test/file.json",
          exists: true,
          type: "wat"
        },
        contents: new Buffer(
          `---
test: a
test2: b
---
` + "## Test\n[link](href)\n```js\nconsole.log(window)\n```"
        )
      })
  ).toMatchSnapshot();
});
