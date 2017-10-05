import asciidoctor from "asciidoctor.js";
import unified from "unified";
import parse from "rehype-parse";
import slug from "rehype-slug";
import autoLinkHeadings from "rehype-autolink-headings";
import highlight from "rehype-highlight";
import html from "rehype-stringify";
import rehype2react from "rehype-react";

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
  let data = {
    ...doc.attributes.$$smap,
    body: ad.convert(text, defaultOptions)
  };
  data.date = new Date(
    (doc.getAttribute("date") ||
      doc.getAttribute("revdate") ||
      doc.getAttribute("localdate") ||
      doc.getAttribute("docdate")
    ).replace(/-/g, "/")
  );
  data.title = doc.getAttribute("doctitle");
  data.layout = doc.getAttribute("layout");
  data.showdate = doc.getAttribute("nodate", true);
  data.tags = doc.getAttribute("tags", "").split(",");
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

export default (config?: PhenomicConfig, contents: string) => {
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

  data.body = processor.processSync(data.body).contents;
  return data;
};
