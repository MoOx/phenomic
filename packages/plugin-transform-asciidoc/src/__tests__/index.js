// @flow

import config from "@phenomic/core/lib/defaultConfig.js";

import transformAsciidoc from "../index.js";

it("should transform asciidoc as html", () => {
  const plugin = transformAsciidoc(config, {});
  expect(typeof plugin.transform === "function").toBe(true);
  expect(
    plugin.transform &&
      plugin.transform({
        file: {
          name: "file.adoc",
          fullpath: "/test/file.adoc"
          // exists: true,
          // type: "wat"
        },
        contents: new Buffer(`
= Hello, AsciiDoc!
Ezra Lalonde <ezra@usefuliftrue.com>
v1.0, 2017-10-05: First draft
:date: 2011-12-25
:tags: phenomic, documentation, test, déjà vu
:iconsdir: /path/to/icons
Test of Asciidoc.js transformer for Phenomic.

== Heading

* item 1
* item 2

[source,javascript]
const name = "Ezra"
console.log(\`Hello, \${name}!\`)
`)
      })
  ).toMatchSnapshot();
});

it("should transform asciidoc as json", () => {
  const plugin = transformAsciidoc(config, { output: "json" });
  expect(typeof plugin.transform === "function").toBe(true);
  expect(
    plugin.transform &&
      plugin.transform({
        file: {
          name: "file.adoc",
          fullpath: "/test/file.adoc"
          // exists: true,
          // type: "wat"
        },
        contents: new Buffer(`
= Hello, AsciiDoc!
Ezra Lalonde <ezra@usefuliftrue.com>
v1.0, 2017-10-05: First draft
:iconsdir: /path/to/icons
Test of Asciidoc.js transformer for Phenomic.

== Heading

* item 1
* item 2

[source,javascript]
const name = "Ezra"
console.log(\`Hello, \${name}!\`)
`)
      })
  ).toMatchSnapshot();
});
