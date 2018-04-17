// @flow

import path from "path";

import readFile from "../utils/readFile";

const debug = require("debug")("phenomic:core:injection");

const defaultTransformPlugin: PhenomicPlugin = {
  name: "@phenomic/plugin-default-transform",
  supportedFileTypes: [],
  transform({ contents }) {
    return {
      partial: {},
      data: {
        body: contents
      }
    };
  }
};

async function processFile({
  db,
  fileKey,
  file,
  transformers,
  collectors
}: {|
  db: PhenomicDB,
  fileKey: string,
  file: PhenomicContentFile,
  transformers: PhenomicPlugins,
  collectors: PhenomicPlugins,
  isProduction?: boolean
|}) {
  debug(`processing ${file.name}`);

  let contents;
  try {
    contents = await readFile(file.fullpath);
  } catch (err) {
    if (err.code !== "EISDIR") {
      console.error(file.name, err.message);
    }
  }

  const transformPlugin = transformers.find(
    (plugin: PhenomicPlugin) =>
      Array.isArray(plugin.supportedFileTypes) &&
      plugin.supportedFileTypes.indexOf(path.extname(file.name).slice(1)) !== -1
  );
  const plugin = transformPlugin || defaultTransformPlugin;
  if (typeof plugin.transform !== "function") {
    throw new Error("transform plugin must implement a transform() method");
  }
  if (contents) {
    const parsed: PhenomicTransformResult = await plugin.transform({
      file,
      contents
    });

    debug(`${fileKey}/${file.name} processed`);
    // Don't show drafts in production
    if (process.env.NODE_ENV === "production" && parsed.data.draft) {
      debug(`${fileKey}/${file.name} skipped because it's a draft`);
      return;
    }

    return collectors.forEach((plugin: PhenomicPlugin) => {
      const fileName = path.join(fileKey, file.name);
      if (typeof plugin.collectFile === "function") {
        plugin.collectFile({ db, fileName, parsed });
      }
    });
  }
}

export default processFile;
