import transformer from "./transformer.js";

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
  return transformer(config, contents);
}

export default function(): PhenomicPlugin {
  return {
    name: "@phenomic/plugin-transform-asciidoc",
    supportedFileTypes: ["asciidoc", "adoc", "ad"],
    transform: transformAsciidocFile
  };
}
