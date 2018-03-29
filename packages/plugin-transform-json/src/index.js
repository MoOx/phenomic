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

      return {
        data: json,
        partial: json.partial || json
      };
    }
  };
};

export default transformJSON;
