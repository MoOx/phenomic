// @flow

import unifiedProcessor from "../unifiedProcessor.js";

// ripped from plugin-transform-markdown
const defaultMdOptions = {
  output: "html",
  plugins: [
    require("remark-parse"),
    require("remark-toc"),
    require("remark-highlights"),
    [require("remark-rehype"), { allowDangerousHTML: true }],
    require("rehype-raw"),
    require("rehype-slug"),
    require("rehype-autolink-headings"),
  ],
};

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
  const processor = unifiedProcessor({
    output: "json",
    plugins: defaultMdOptions.plugins,
  });
  // $FlowFixMe mixed insn't ok?
  const md = processor.processSync(input).contents;
  expect(md).toMatchSnapshot();
});

it("should render markdown as html", () => {
  const processor = unifiedProcessor({ plugins: defaultMdOptions.plugins });
  // $FlowFixMe mixed insn't ok?
  const md = processor.processSync(input).contents;
  expect(md).toMatchSnapshot();
});
