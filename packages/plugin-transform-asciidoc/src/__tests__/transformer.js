import defaultConfig from "@phenomic/core/lib/defaultConfig.js";

import transformer from "../transformer.js";

const input = `
= Hello, AsciiDoc!
Ezra Lalonde <ezra@usefuliftrue.com>
v1.0, 2017-10-05: First Draft
:tags: phenomic, documentation, test, déjà vu

Test of Asciidoc.js transformer for Phenomic.

== Heading

* item 1
* item 2

[source,javascript]
const name = "Ezra"
console.log(\`Hello, ${name}!\`)
`;

it("should render asciidoc as json (react component)", () => {
  const adoc = transformer(
    {
      ...defaultConfig,
      plugins: [{ name: "@phenomic/plugin-renderer-react" }]
    },
    input
  ).contents;
  expect(adoc).toMatchSnapshot();
});

it("should render asciidoc as html", () => {
  const adoc = transformer(defaultConfig, input);
  expect(adoc).toMatchSnapshot();
});
