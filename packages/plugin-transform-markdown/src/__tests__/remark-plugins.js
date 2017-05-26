import remarkPlugins from "../remark-plugins.js";

it("should render markdown as json (react component)", () => {
  const input = "## Test\n[link](href)\n```js\nconsole.log(window)\n```";
  const md = remarkPlugins(
    {
      outdir: "",
      path: "",
      port: 0,
      plugins: [{ name: "@phenomic/plugin-renderer-react" }]
    },
    input
  ).contents;
  expect(md).toMatchSnapshot();
});

it("should render markdown as html", () => {
  const input = "## Test\n[link](href)\n```js\nconsole.log(window)\n```";
  const md = remarkPlugins(
    {
      outdir: "",
      path: "",
      port: 0,
      plugins: []
    },
    input
  ).contents;
  expect(md).toMatchSnapshot();
});
