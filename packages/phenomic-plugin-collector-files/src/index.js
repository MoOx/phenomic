import path from "path"

const debug = require("debug")("phenomic:plugin:collector-files")

export function getKey(name: string, json: PhenomicTransformResult): string {
  if (json.data.path) {
    return json.data.path
  }
  return path.join(
    path
      .dirname(name)
      // remove first folder (used for collection key)
      .split(path.sep)
      .slice(1)
      .join(path.sep),
    // remove (index).md for key
    name.endsWith("index.md") ? "" : path.basename(name, ".md"),
  )
}

export function formatDate(dateString: string) {
  const date = new Date(dateString).toISOString()
  return date.substring(0, date.indexOf("T"))
}

/**
 * If a date is present, we use it in order to naturally sort the items in db
 * as level sorts by name (YYYY-MM-DD does the trick).
 * If not, we just use alphabetical order.
 */
export function getSortedKey(name: string, json: PhenomicTransformResult) {
  const key = getKey(name, json)
  if (typeof json.data.date === "string") {
    return `${formatDate(json.data.date)}-${key}`
  }
  return key
}

export function getAuthors(json: PhenomicTransformResult) {
  if (typeof json.data.author === "string") {
    return [json.data.author]
  }
  if (Array.isArray(json.data.authors)) {
    return json.data.authors
  }
  return []
}

export function getTags(json: PhenomicTransformResult) {
  if (Array.isArray(json.data.tags)) {
    return json.data.tags
  }
  return []
}

export default function() {
  return {
    name: "phenomic-plugin-collector-files",
    collect(db: PhenomicDB, name: string, json: PhenomicTransformResult) {
      const pathSegments = name.split(path.sep)
      const collectionName = pathSegments[0]
      const key = getKey(name, json)
      debug(`collecting ${key} for collection '${collectionName}'`)
      const sortedKey = getSortedKey(name, json)
      return Promise.all([
        // full resource, not sorted
        db.put([collectionName], key, { ...json, id: key }),
        // sorted list
        db.put([collectionName, "default"], sortedKey, { id: key }),
        // sorted list, filtered by authors
        ...getAuthors(json).map(author => {
          return Promise.all([
            db.put([collectionName, "authors", author], sortedKey, { id: key }),
            db.put(["authors", collectionName], author, { id: author }),
          ])
        }),
        ...getTags(json).map(tag => {
          return Promise.all([
            // sorted list, filtered by tags
            db.put([collectionName, "tags", tag], sortedKey, { id: key }),
            // global tag list
            db.put(["tags"], tag, { id: tag }),
            db.put(["tags", "default"], tag, { id: tag }),
            db.put(["tags", "collection", collectionName], tag, { id: tag }),
          ])
        }),
      ])
    },
  }
}
