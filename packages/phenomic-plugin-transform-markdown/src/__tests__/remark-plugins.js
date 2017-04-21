import renderer from "react-test-renderer"

import remarkPlugins from "../remark-plugins.js"

it("should render markdown as react component", () => {
  const md = remarkPlugins(
    "## Test\n[link](href)\n```js\nconsole.log(window)\n```",
  ).contents
  const tree = renderer.create(md).toJSON()
  expect(tree).toMatchSnapshot()
})
