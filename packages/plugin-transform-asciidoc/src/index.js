import transformer from "./transformer.js";

const debug = require("debug")("phenomic:plugin:transform-asciidoc");

const transformAsciidoc: PhenomicPluginModule<{}> = (
  config: PhenomicConfig
) => {
  return {
    name: "@phenomic/plugin-transform-asciidoc",
    supportedFileTypes: ["asciidoc", "adoc", "ad"],
    transform({
      file,
      contents
    }: {|
      file: PhenomicContentFile,
      contents: Buffer
    |}) {
      debug(`transforming ${file.fullpath}`);
      return transformer(config, contents);
    }
  };
};

export default transformAsciidoc;
