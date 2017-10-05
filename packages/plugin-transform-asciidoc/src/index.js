import transformer from "./transformer.js";
import deburr from "lodash.deburr";
import kebabCase from "lodash.kebabcase";

const debug = require("debug")("phenomic:plugin:transform-asciidoc");

function transformAsciidocFile({
  config,
  file,
  contents
}: {
  config?: PhenomicConfig,
  file: PhenomicContentFile,
  contents: Buffer
}) {
  debug(`transforming ${file.fullpath}`);
  let data = transformer(config, contents);
  data.tags = data.tags ? data.tags.map(tag => kebabCase(deburr(tag))) : [];
  return data;
}

export default function(): PhenomicPlugin {
  return {
    name: "@phenomic/plugin-transform-asciidoc",
    supportedFileTypes: ["asciidoc", "adoc", "ad"],
    transform: transformAsciidocFile
  };
}
