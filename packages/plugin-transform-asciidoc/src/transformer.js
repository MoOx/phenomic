import asciidoctor from "asciidoctor.js";
import unified from "unified";
import parse from "rehype-parse";
import slug from "rehype-slug";
import autoLinkHeadings from "rehype-autolink-headings";
import highlight from "rehype-highlight";
import html from "rehype-stringify";
import rehype2react from "rehype-react";
import deburr from "lodash.deburr";
import kebabCase from "lodash.kebabcase";

const defaultOptions = {
  safe: "secure",
  attributes: {
    header_footer: "false",
    "linkcss!": "",
    "copycss!": ""
  }
};

const envAttributes = [
  "asciidoctor",
  "asciidoctor-version",
  "backend",
  "basebackend",
  "docdate",
  "docdatetime",
  "docdir",
  "docfile",
  "docfilesuffix",
  "docname",
  "doctime",
  "doctype",
  "docyear",
  "embedded",
  "filetype",
  "htmlsyntax",
  "localdate",
  "localdatetime",
  "localtime",
  "localyear",
  "outdir",
  "outfile",
  "outfilesuffix",
  "safe-mode-level",
  "safe-mode-name",
  "safe-mode-unsafe",
  "safe-mode-safe",
  "safe-mode-server",
  "safe-mode-secure",
  "user-home"
];

function processAsciidoc(text) {
  const ad = asciidoctor();
  const doc = ad.load(text, defaultOptions);
  const data = {
    ...doc.attributes.$$smap,
    contents: ad.convert(text, defaultOptions)
  };

  data.date =
    doc.getAttribute("date") || doc.getAttribute("revdate") || undefined;
  data.title = doc.getAttribute("doctitle");
  data.layout = doc.getAttribute("layout");
  data.showdate = doc.getAttribute("nodate", true);
  data.tags = doc.getAttribute("tags");
  data.tags = data.tags
    ? data.tags.split(",").map(tag => kebabCase(deburr(tag)))
    : [];

  envAttributes.map(key => delete data[key]);

  return data;
}

// here we optimize structure just a little to have to smallest json possible
const createElement = (component, props, children) => {
  return {
    t: component,
    ...(props && Object.keys(props).length ? { p: props } : {}),
    ...(children ? { c: children } : {})
  };
};

export default (config?: PhenomicConfig, contents: Buffer) => {
  const data = processAsciidoc(contents);

  const processor = unified()
    .use(parse, { fragment: true })
    .use(slug)
    .use(autoLinkHeadings)
    .use(highlight);

  const useReact =
    config &&
    config.plugins &&
    config.plugins.find(p => p.name === "@phenomic/plugin-renderer-react");

  if (!useReact) {
    processor.use(html);
  } else {
    processor.use(rehype2react, { createElement });
  }

  // $FlowFixMe mixed lol
  data.contents = processor.processSync(data.contents).contents;
  return data;
};
