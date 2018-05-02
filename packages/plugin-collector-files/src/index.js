// @flow

const debug = require("debug")("phenomic:plugin:collector-files");

const sep = "/";
function normalizeWindowsPath(value: string): string {
  return value.replace(/(\/|\\)+/g, sep);
}

export function getId(
  name: string,
  json: PhenomicTransformResult,
  extensions?: $ReadOnlyArray<string> = []
): string {
  if (json.data.path) {
    debug(`id for '${name}' is '${json.data.path}' (from json)`);
    return json.data.path;
  }
  // normalize windows path
  name = normalizeWindowsPath(name);
  // remove (index).md,json etc, for id
  const id = name
    // @todo remove from supportedFileTypes!
    // remove extension for prettier keys
    .replace(new RegExp(`\\.(${extensions.join("|")})$`), "")
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
  json: PhenomicTransformResult
): PhenomicTransformResult {
  const injectedData: Object = {
    filename: name
  };
  try {
    injectedData.date = formatDate(name.slice(0, dateLength));
  } catch (e) {
    // assuming date is not valid
  }
  return {
    data: {
      ...injectedData,
      ...json.data
    },
    partial: {
      ...injectedData,
      ...json.partial
    }
  };
}

export function parsePath(
  name: string
): {| filename: string, allPaths: $ReadOnlyArray<string> |} {
  const pathSegments = name.split(sep);
  const allPaths = pathSegments.reduce((acc, v) => {
    acc.push(acc.length > 0 ? acc[acc.length - 1] + sep + v : v);
    return acc;
  }, []);
  const filename = pathSegments[pathSegments.length - 1];
  return { filename, allPaths };
}

const collectorFiles: PhenomicPluginModule<{}> = () => {
  return {
    name: "@phenomic/plugin-collector-files",
    collectFile({ db, fileName: name, parsed: json, transformer }) {
      name = normalizeWindowsPath(name);
      const id = getId(name, json, transformer.supportedFileTypes);
      const { filename, allPaths } = parsePath(name);
      const adjustedJSON = injectData(filename, json);
      // debug(`collecting '${filename}'`, adjustedJSON);
      debug(`collecting '${filename}'`);
      // full resource, not sorted
      db.put(null, id, adjustedJSON);
      return allPaths.map(pathName => {
        let relativeKey = id.replace(pathName + sep, "");
        if (relativeKey === pathName) {
          relativeKey = "";
        }
        debug(`collecting '${relativeKey}' for path '${pathName}'`);
        // @todo optimize this and avoid inserting adjustedJSON several times
        // we should be able to inject a ref to get it back from __null__ when
        // reading
        db.put([pathName], relativeKey, adjustedJSON);
        db.put([pathName, "default"], relativeKey);
        Object.keys(json.data).map(type => {
          return getFieldValue(json, type).map(fieldValue => {
            debug(
              `collecting '${relativeKey}' for path '${pathName}': ${type}/${
                fieldValue
              }`
            );
            db.update([pathName, type, fieldValue], relativeKey);
            db.update([type, "default"], fieldValue);
            db.update([type, "path", pathName], fieldValue);
          });
        });
      });
    }
  };
};

export default collectorFiles;
