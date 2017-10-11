import defaultConfig from "@phenomic/core/lib/defaultConfig.js";

import transformer from "../transformer.js";

const input = new Buffer(`
= Hello, AsciiDoc!
Ezra Lalonde <ezra@usefuliftrue.com>
v1.0, 2017-10-05: First Draft
:tags: phenomic, documentation, test, déjà vu
:iconsdir: /path/to/icons

Test of Asciidoc.js transformer for Phenomic.

== Heading

* item 1
* item 2

[source,javascript]
const name = "Ezra"
console.log(\`Hello, \${name}!\`)
`);

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

it("should have tags", () => {
  const adoc = transformer(
    defaultConfig,
    new Buffer(`
= Title
:tags: phenomic, documentation, test, déjà vu
  `)
  );
  expect(adoc.tags).toEqual(["phenomic", "documentation", "test", "deja-vu"]);
});

it("should not have tags", () => {
  const adoc = transformer(
    defaultConfig,
    new Buffer(`
= Title
  `)
  );
  expect(adoc.tags).toEqual([]);
});

it("should use explicit date attribute for date", () => {
  const adoc = transformer(
    defaultConfig,
    new Buffer(`
= Title
Ezra Lalonde <ezra@usefuliftrue.com>
v1.0, 2017-10-05: First Draft
:date: 2011-12-25
  `)
  );
  expect(adoc.date).toBe("2011-12-25");
});

it("should use revdate for date", () => {
  const adoc = transformer(
    defaultConfig,
    new Buffer(`
= Title
Ezra Lalonde <ezra@usefuliftrue.com>
v1.0, 2017-10-05: First Draft
  `)
  );
  expect(adoc.date).toBe("2017-10-05");
});

it("should use have no date attribute", () => {
  const adoc = transformer(
    defaultConfig,
    new Buffer(`
= Title
  `)
  );
  expect(adoc.date).toBe(undefined);
});
