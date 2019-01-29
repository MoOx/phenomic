// @flow

import asciidoctor from "asciidoctor.js";
import unifiedProcessor from "@phenomic/helpers-transform/lib/unifiedProcessor";
import type { plugin } from "@phenomic/helpers-transform/lib//unifiedProcessor";
import extractMetaFromBodyNode from "@phenomic/helpers-transform/lib/extractMetaFromBodyNode";

import defaultOptions from "./default-options";

// eslint-disable-next-line
const debug = require("debug")("phenomic:plugin:transform-asciidoc");

const adDefaultOptions = {
  safe: "secure",
  attributes: {
    header_footer: "false",
    "linkcss!": "",
    "copycss!": "",
  },
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
  "user-home",
];

type options = {|
  output?: "json" | "html",
  plugins?: $ReadOnlyArray<plugin>,
|} | void; // void? https://github.com/facebook/flow/issues/2977

const name = "@phenomic/plugin-transform-asciidoc";

const transformAsciidoc: PhenomicPluginModule<options> = (
  config: PhenomicConfig,
  options?: options,
) => {
  const processor = unifiedProcessor({
    output: (options && options.output) || defaultOptions.output,
    plugins: (options && options.plugins) || defaultOptions.plugins,
  });

  return {
    name,
    supportedFileTypes: ["asciidoc", "adoc", "ad"],
    transform: ({
      file,
      contents,
    }: {|
      file: PhenomicContentFile,
      contents: Buffer,
    |}) => {
      debug(`transforming ${file.fullpath}`);
      const ad = asciidoctor();
      const doc = ad.load(contents, adDefaultOptions);
      const tags = doc.getAttribute("tags");

      const content = ad.convert(contents, adDefaultOptions);
      // $FlowFixMe it's here, I can feel it Flow
      const body = processor.processSync(content).contents;

      const partial = {
        ...extractMetaFromBodyNode(body),
        ...doc.attributes.$$smap,
        date:
          doc.getAttribute("date") || doc.getAttribute("revdate") || undefined,
        // title fallback
        title: doc.getAttribute("doctitle") || file.name,
        layout: doc.getAttribute("layout"),
        showdate: doc.getAttribute("nodate", true),
        tags: tags ? tags.split(",").map(t => t.trim()) : [],
      };
      envAttributes.map(key => delete partial[key]);

      return {
        data: {
          ...partial,
          body,
        },
        partial,
      };
    },
  };
};

export default transformAsciidoc;
