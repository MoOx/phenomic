// @flow

import bundlerWebpack from "@phenomic/plugin-bundler-webpack";
import rendererReact from "@phenomic/plugin-renderer-react";
import collectorFiles from "@phenomic/plugin-collector-files";
import transformMarkdown from "@phenomic/plugin-transform-markdown";
import transformJson from "@phenomic/plugin-transform-json";
import apiRelatedContent from "@phenomic/plugin-api-related-content";
import publicAssets from "@phenomic/plugin-public-assets";

const presetReactApp = () => {
  return {
    plugins: {
      "@phenomic/plugin-bundler-webpack": bundlerWebpack,
      "@phenomic/plugin-renderer-react": rendererReact,
      "@phenomic/plugin-transform-markdown": [
        transformMarkdown,
        { output: "json" }
      ],
      "@phenomic/plugin-transform-json": transformJson,
      "@phenomic/plugin-collector-files": collectorFiles,
      "@phenomic/plugin-api-related-content": apiRelatedContent,
      "@phenomic/plugin-public-asset": publicAssets
    }
  };
};

export default presetReactApp;
