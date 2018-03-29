import deburr from "lodash.deburr";
import kebabCase from "lodash.kebabcase";
import frontMatterParser from "gray-matter";

import remarkPlugins from "./transformer.js";

const debug = require("debug")("phenomic:plugin:transform-markdown");

function transformMarkdownFile({
  config,
  file,
  contents
}: {|
  config?: PhenomicConfig,
  file: PhenomicContentFile,
  contents: Buffer
|}) {
  debug(`transforming ${file.fullpath}`);
  const front = frontMatterParser(contents.toString());
  debug(`front matter for ${file.fullpath}`, front.data);
  const partial = {
    ...front.data,
    // @todo should be here or user land ?
    ...(Array.isArray(front.data.tags)
      ? {
          tags: front.data.tags.map(tag => kebabCase(deburr(tag)))
        }
      : {})
  };
  return {
    data: {
      ...partial,
      body: remarkPlugins(config, front.content).contents
    },
    partial
  };
}

const transformMarkdown: PhenomicPluginModule<{}> = (
  config: PhenomicConfig
) => {
  return {
    name: "@phenomic/plugin-transform-markdown",
    supportedFileTypes: ["md", "markdown"],
    transform: ({
      file,
      contents
    }: {|
      file: PhenomicContentFile,
      contents: Buffer
    |}) => transformMarkdownFile({ config, file, contents })
  };
};

export default transformMarkdown;
