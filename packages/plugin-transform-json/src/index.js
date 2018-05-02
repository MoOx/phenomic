// @flow

const debug = require("debug")("phenomic:plugin:transform-json");

const transformJSON: PhenomicPluginModule<{}> = () => {
  return {
    name: "@phenomic/plugin-transform-json",
    supportedFileTypes: ["json"],
    transform({
      file,
      contents
    }: {|
      file: PhenomicContentFile,
      contents: Buffer
    |}): PhenomicTransformResult {
      debug(`transforming ${file.name}`);

      const json = JSON.parse(contents.toString());

      const partial = {
        // title fallback
        title: file.name,
        ...(json.partial || json)
      };

      return {
        data: json,
        partial
      };
    }
  };
};

export default transformJSON;
