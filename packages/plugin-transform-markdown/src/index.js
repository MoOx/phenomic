// @flow

import deburr from "lodash.deburr";
import kebabCase from "lodash.kebabcase";
import frontMatterParser from "gray-matter";
import unifiedProcessor from "@phenomic/helpers-transform/lib/unifiedProcessor";
import type { plugin } from "@phenomic/helpers-transform/lib//unifiedProcessor";

import defaultOptions from "./default-options";

// eslint-disable-next-line
const debug = require("debug")("phenomic:plugin:transform-markdown");

type options = {|
  output?: "json" | "html",
  plugins?: $ReadOnlyArray<plugin>
|} | void; // void? https://github.com/facebook/flow/issues/2977

const name = "@phenomic/plugin-transform-markdown";

const transformMarkdown: PhenomicPluginModule<options> = (
  config: PhenomicConfig,
  options?: options
) => {
  const processor = unifiedProcessor({
    output: (options && options.output) || defaultOptions.output,
    plugins: (options && options.plugins) || defaultOptions.plugins
  });

  return {
    name,
    supportedFileTypes: ["md", "markdown"],
    transform: ({
      file,
      contents
    }: {|
      file: PhenomicContentFile,
      contents: Buffer
    |}) => {
      debug(`transforming ${file.fullpath}`);
      const front = frontMatterParser(contents.toString());
      debug(`front matter for ${file.fullpath}`, front.data);
      const partial = {
        ...front.data,
        // @todo should be here or user land ?
        ...(Array.isArray(front.data.tags)
          ? { tags: front.data.tags.map(tag => kebabCase(deburr(tag))) }
          : {})
      };

      return {
        data: {
          ...partial,
          // $FlowFixMe it's here, I can feel it Flow
          body: processor.processSync(front.content).contents
        },
        partial
      };
    }
  };
};

export default transformMarkdown;
