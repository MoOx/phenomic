// @flow

import fs from "fs";
import path from "path";

import globby from "globby";
import socketIO from "socket.io";
import logger from "@phenomic/core/lib/logger";
import getPath from "@phenomic/core/lib/utils/getPath.js";

import createWatcher from "./watch.js";

const debug = require("debug")("phenomic:plugin:collector-files");

const pluginName = "@phenomic/plugin-collector-files";
const log = logger(pluginName);

const sep = "/";
function normalizeWindowsPath(value: string): string {
  return value.replace(/(\/|\\)+/g, sep);
}

const toFile = (root, filepath) => ({
  name: filepath,
  fullpath: path.join(root, filepath),
});

function glob({
  path,
  patterns,
}: {|
  path: string,
  patterns: $ReadOnlyArray<string>,
|}): $ReadOnlyArray<PhenomicContentFile> {
  return globby.sync(patterns, { cwd: path }).map(file => toFile(path, file));
}

const readFile = (path: string): Promise<Buffer> =>
  new Promise((resolve, reject) =>
    fs.readFile(path, (error, file) => (error ? reject(error) : resolve(file))),
  );

export function makeId(name: string, json: PhenomicTransformResult): string {
  if (json.data.path) {
    debug(`id for '${name}' is '${json.data.path}' (from json)`);
    return json.data.path;
  }
  // normalize windows path
  name = normalizeWindowsPath(name);
  // remove (index).md,json etc, for id
  const id = name
    // remove extension for prettier keys
    .replace(path.extname(name), "")
    // remove index too (and consider README as index)
    .replace(/\/(index|README)$/, "");
  debug(`id for '${name}' is '${id}' (automatically computed)`);
  return id;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString).toISOString();
  return date.substring(0, date.indexOf("T"));
}

function isLiteral(value) {
  const type = typeof value;
  return type === "string" || type === "number" || type === "boolean";
}

function isArrayOfLiterals(array) {
  return Array.isArray(array) && array.every(isLiteral);
}

export function getFieldValue(json: PhenomicTransformResult, id: string) {
  if (isArrayOfLiterals(json.data[id])) {
    return json.data[id];
  }
  if (isLiteral(json.data[id])) {
    return [json.data[id]];
  }
  return [];
}

const dateLength = "YYYY-MM-DD".length;
export function injectData(
  name: string,
  json: PhenomicTransformResult,
): PhenomicTransformResult {
  const injectedData: Object = {
    filename: name,
  };
  try {
    injectedData.date = formatDate(name.slice(0, dateLength));
  } catch (e) {
    // assuming date is not valid
  }
  return {
    data: {
      ...injectedData,
      ...json.data,
    },
    partial: {
      ...injectedData,
      ...json.partial,
    },
  };
}

export function parsePath(
  name: string,
): {| name: string, allPaths: $ReadOnlyArray<string> |} {
  const pathSegments = name.split(sep);
  return {
    name: pathSegments[pathSegments.length - 1],
    allPaths: pathSegments.reduce((acc, v) => {
      acc.push(acc.length > 0 ? acc[acc.length - 1] + sep + v : v);
      return acc;
    }, []),
  };
}

const collectData = async ({ db, filename, data }) => {
  // console.log(filename, data);
  const json = data;
  filename = normalizeWindowsPath(filename);
  const id = makeId(filename, json);
  const { name, allPaths } = parsePath(filename);

  const adjustedJSON = injectData(name, json);
  // debug(`collecting '${name}'`, adjustedJSON);
  debug(`collecting '${name}' for ${allPaths.join(", ")}`);
  // full resource, not sorted
  db.put(null, id, adjustedJSON);
  return allPaths.map(pathName => {
    let relativeKey = id.replace(pathName + sep, "");
    if (relativeKey === pathName) {
      relativeKey = "";
    }
    // debug(`collecting '${relativeKey}' for path '${pathName}'`);
    // @todo optimize this and avoid inserting adjustedJSON several times
    // we should be able to inject a ref to get it back from __null__ when
    // reading
    db.put([pathName], relativeKey, adjustedJSON);
    db.put([pathName, "default"], relativeKey);
    Object.keys(json.data).map(type => {
      return getFieldValue(json, type).map(fieldValue => {
        // debug(
        //   `collecting '${relativeKey}' for path '${pathName}': ${type}/${
        //     fieldValue
        //   }`
        // );
        db.update([pathName, type, fieldValue], relativeKey);
        db.update([type, "default"], fieldValue);
        db.update([type, "path", pathName], fieldValue);
      });
    });
  });
};

const processFile = async ({
  file,
  contents,
  transform,
}: {
  file: PhenomicContentFile,
  contents: Buffer,
  transform: PhenomicTransformer,
}) => {
  const transformed: PhenomicTransformResult = await transform({
    file,
    contents,
  });

  debug(`${file.name} processed`);
  // Don't show drafts in production
  if (process.env.NODE_ENV === "production" && transformed.data.draft) {
    debug(`${file.name} skipped because it's a draft`);
    return;
  }

  return transformed;
};

type options = {|
  // @todo move core config as plugin options
|} | void; // void? https://github.com/facebook/flow/issues/2977

const collectorFiles: PhenomicPluginModule<options> = (
  config: PhenomicConfig,
  options?: options,
) => {
  let transformedMap: {
    [key: string]: {|
      contentKey: string,
      file: PhenomicContentFile,
      contents: Buffer,
      transformed: PhenomicTransformResult,
    |},
  } = {};

  return {
    name: pluginName,
    async collect({ db, transformers }) {
      const transformByFileTypes: { [key: string]: PhenomicTransformer } = {};
      transformers.forEach(
        plugin =>
          plugin.supportedFileTypes &&
          plugin.supportedFileTypes.forEach(fileType => {
            if (plugin.transform)
              transformByFileTypes[fileType] = plugin.transform;
          }),
      );

      const readAndTransform = async (
        contentKey: string,
        file: PhenomicContentFile,
      ) => {
        const transformer =
          transformByFileTypes[path.extname(file.name).slice(1)];
        // nothing to do with the file, ignoring
        if (!transformer) {
          debug(`No transformers found for ${file.name}, skipping`);
          return;
        }

        // read file
        let contents;
        try {
          contents = await readFile(file.fullpath);
        } catch (err) {
          if (err.code !== "EISDIR") console.error(file.name, err.message);
          return;
        }

        const transformed = await processFile({
          file,
          contents: contents,
          transform: transformer,
        });

        // for any reason, a transformer can decide to not return anything
        if (!transformed) {
          debug(`Transformation empty for ${file.name}, skipping`);
          return;
        }
        // keep in memory for dev
        transformedMap[file.fullpath] = {
          contentKey,
          file,
          contents: contents,
          transformed,
        };
      };
      const forget = fullpath => {
        delete transformedMap[fullpath];
      };

      const collectAll = async () => {
        await db.destroy();
        return await Promise.all(
          Object.keys(transformedMap).map(fullpath =>
            collectData({
              db,
              filename: path.join(
                transformedMap[fullpath].contentKey,
                transformedMap[fullpath].file.name,
              ),
              data: transformedMap[fullpath].transformed,
            }),
          ),
        );
      };

      const maybeFolders = await Promise.all(
        Object.keys(config.content).map(async contentKey => {
          let globs;
          try {
            let folder;

            // "key(and folder)": ["glob/*"]
            if (Array.isArray(config.content[contentKey])) {
              folder = path.join(config.path, contentKey);
              globs = config.content[contentKey];
            } else if (
              config.content[contentKey].root &&
              config.content[contentKey].globs
            ) {
              // "key": {root: folder, globs: ["glob/*"] }
              folder = path.join(config.path, config.content[contentKey].root);
              // $FlowFixMe stfu
              globs = config.content[contentKey].globs;
            } else {
              throw new Error(
                "Unexpected config for 'content' option: " +
                  config.content[contentKey].toString(),
              );
            }

            const contentPath = await getPath(folder);
            return { contentKey, contentPath, globs };
          } catch (e) {
            log.warn(
              `no '${contentKey}' folder found or unable to read files. Please create and put files in this folder (or double check it) if you want the content to be accessible (eg: markdown or JSON files). `,
            );
            return {};
          }
        }),
      );

      const folders = maybeFolders.filter(
        folder => folder.contentKey !== undefined,
      );

      if (folders.length <= 0) {
        return;
      }

      await Promise.all(
        folders.map(async ({ contentKey, contentPath, globs }) => {
          const files = glob({
            path: contentPath,
            // $FlowFixMe lazy me
            patterns: globs,
          });
          await Promise.all(
            files.map(file => readAndTransform(contentKey, file)),
          );
        }),
      );
      await collectAll();

      if (process.env.PHENOMIC_ENV !== "development") {
        // clean memory now as this won't be reused
        transformedMap = {};
        return;
      }
      // @todo if we want to make things "clean", we should returns
      // socket/watchers so we can close those properly
      const io = socketIO(config.socketPort);
      await Promise.all(
        folders.map(async ({ contentKey, contentPath, globs }) => {
          const watcher = createWatcher({
            path: await getPath(contentPath),
            // $FlowFixMe stfu
            patterns: globs,
          });

          watcher.on("ready", () => {
            debug("watcher ready");
            // io.emit("change");
          });
          watcher.on("change", async (name, root) => {
            debug(`${name} has been updated`);
            log.info(`${name} has been updated`);
            await readAndTransform(contentKey, {
              name,
              fullpath: path.join(root, name),
            });
            await collectAll();
            io.emit("change");
            debug(`Data updated`);
          });
          watcher.on("add", async (name, root) => {
            debug(`${name} has been added`);
            log.info(`${name} has been added`);
            await readAndTransform(contentKey, {
              name,
              fullpath: path.join(root, name),
            });
            await collectAll();
            io.emit("change");
            debug(`Data updated`);
          });
          watcher.on("delete", async (name, root) => {
            log.info(`${name} has been deleted`);
            forget(path.join(root, name));
            await collectAll();
            io.emit("change");
            debug(`Data updated`);
          });
          return watcher;
        }),
      );
    },
  };
};

export default collectorFiles;
