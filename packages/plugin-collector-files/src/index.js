const debug = require("debug")("phenomic:plugin:collector-files");

const sep = "/";
function normalizeWindowsPath(value: string) {
  return value.replace(/(\/|\\)+/g, sep);
}

export function getKey(name: string, json: PhenomicTransformResult): string {
  if (json.data.path) {
    debug(`key for '${name}' is '${json.data.path}' (from json)`);
    return json.data.path;
  }
  // normalize windows path
  name = normalizeWindowsPath(name);
  // remove (index).md,json etc, for key
  const key = name
    // remove extension for prettier keys
    .replace(/.(md|json)$/, "")
    // remove index too
    .replace(/\/index$/, "");
  debug(`key for '${name}' is '${key}' (automatically computed)`);
  return key;
}

export function formatDate(dateString: string) {
  const date = new Date(dateString).toISOString();
  return date.substring(0, date.indexOf("T"));
}

/**
 * If a date is present, we use it in order to naturally sort the items in db
 * as level sorts by name (YYYY-MM-DD does the trick).
 * If not, we just use alphabetical order.
 */
export function makeSortedKey(key: string, json: PhenomicTransformResult) {
  if (typeof json.data.date === "string") {
    return `${formatDate(json.data.date)}-${key}`;
  }
  return key;
}

export function getFields(json: PhenomicTransformResult) {
  const keys = Object.keys(json.data);
  return keys.filter(key => key !== "author" && key !== "authors");
}

function isLiteral(value) {
  const type = typeof value;
  return type === "string" || type === "number" || type === "boolean";
}

function isArrayOfLiterals(array) {
  return Array.isArray(array) && array.every(isLiteral);
}

export function getFieldValue(json: PhenomicTransformResult, key: string) {
  if (isArrayOfLiterals(json.data[key])) {
    return json.data[key];
  }
  if (isLiteral(json.data[key])) {
    return [json.data[key]];
  }
  return [];
}

export function getAuthors(json: PhenomicTransformResult) {
  if (typeof json.data.author === "string") {
    return [json.data.author];
  }
  if (Array.isArray(json.data.authors)) {
    return json.data.authors;
  }
  return [];
}

const dateLength = "YYYY-MM-DD".length;
export function injectData(
  name: string,
  json: PhenomicTransformResult
): PhenomicTransformResult {
  let date;
  try {
    date = formatDate(name.slice(0, dateLength));
  } catch (e) {
    // date is not valid
  }
  return {
    data: {
      date,
      filename: name,
      ...json.data
    },
    partial: {
      date,
      filename: name,
      ...json.data
    }
  };
}

export function parsePath(name: string) {
  const pathSegments = name.split(sep);
  const allPaths = pathSegments.reduce((acc, v) => {
    acc.push(acc.length > 0 ? acc[acc.length - 1] + sep + v : v);
    return acc;
  }, []);
  const filename = pathSegments[pathSegments.length - 1];
  return { filename, allPaths };
}

export default function() {
  return {
    name: "@phenomic/plugin-collector-files",
    collect(db: PhenomicDB, name: string, json: PhenomicTransformResult) {
      name = normalizeWindowsPath(name);
      const key = getKey(name, json);
      const { filename, allPaths } = parsePath(name);
      const adjustedJSON = injectData(filename, json);
      return Promise.all(
        allPaths.map(pathName => {
          const relativeKey = key.replace(pathName + sep, "");
          const sortedKey = makeSortedKey(relativeKey, json);
          debug(`collecting ${relativeKey} for path '${pathName}'`);
          return Promise.all([
            // full resource, not sorted
            db.put(null, key, {
              ...adjustedJSON,
              id: key
            }),
            db.put([pathName], relativeKey, {
              ...adjustedJSON,
              id: relativeKey
            }),
            // sorted list
            db.put([pathName, "default"], sortedKey, { id: relativeKey }),
            // sorted list, filtered by authors
            ...getAuthors(json).map(author => {
              return Promise.all([
                db.put([pathName, "authors", author], sortedKey, {
                  id: relativeKey
                }),
                db.put(["authors", pathName], author, { id: author })
              ]);
            }),
            ...getFields(json).map(type => {
              return getFieldValue(json, type).map(value =>
                Promise.all([
                  // sorted list, filtered by tags
                  db.put([pathName, type, value], sortedKey, {
                    id: relativeKey
                  }),
                  // global tag list
                  db.put([type], value, { id: value, partial: value }),
                  db.put([type, "default"], value, {
                    id: value,
                    partial: value
                  }),
                  db.put([type, "path", pathName], value, {
                    id: value,
                    partial: value
                  })
                ])
              );
            })
          ]);
        })
      );
    }
  };
}
