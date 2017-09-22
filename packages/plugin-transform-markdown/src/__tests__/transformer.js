import defaultConfig from "@phenomic/core/lib/defaultConfig.js";

import remarkPlugins from "../transformer.js";

const input = `## Test
[link](href)
\`\`\`js
console.log(window)
\`\`\`

<button>Random Html</button>
<Button>Random react like stuff</Button>

| Left-aligned | Center-aligned | Right-aligned |
| :---         |     :---:      |          ---: |
| left one     | center one     | right one     |
| left two     | center two     | right two     |
`;

it("should render markdown as json (react component)", () => {
  const md = remarkPlugins(
    {
      ...defaultConfig,
      plugins: [{ name: "@phenomic/plugin-renderer-react" }]
    },
    input
  ).contents;
  expect(md).toMatchSnapshot();
});

it("should render markdown as html", () => {
  const md = remarkPlugins(defaultConfig, input).contents;
  expect(md).toMatchSnapshot();
});
