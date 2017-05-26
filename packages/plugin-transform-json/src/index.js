import path from "path";

const debug = require("debug")("phenomic:plugin:transform-json");

function transformJSONFile({
  file,
  contents
}: {
  file: PhenomicContentFile,
  contents: Buffer
}): PhenomicTransformResult {
  debug(`transforming ${file.name}`);

  const data = {
    ...JSON.parse(contents.toString()),
    path: path.basename(file.name, ".json")
  };
  const {
    // forget unwanted body
    body, // eslint-disable-line
    // partial is what we want
    ...partial
  } = data;

  return {
    data,
    partial
  };
}

export default function(): PhenomicPlugin {
  return {
    name: "@phenomic/plugin-transform-json",
    supportedFileTypes: ["json"],
    transform: transformJSONFile
  };
}
