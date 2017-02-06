import path from "path"

const debug = require("debug")("phenomic:plugin:directory-collector")

function getKey(name, json) {
  if (json.path) {
    return json.path
  }
  return path.join(
    path.dirname(name).split(path.sep).slice(1).join(path.sep),
    name.endsWith("index.md") ? "" : path.basename(name, ".md")
  )
}

function formatDate(dateString) {
  const date = new Date(dateString).toISOString()
  return date.substring(0, date.indexOf("T"))
}

/**
 * If a date is present, we use it in order to naturally sort the items in db
 * as level sorts by name (YYYY-MM-DD does the trick).
 * If not, we just use alphabetical order.
 */
function getSortedKey(name, json) {
  const key = getKey(name, json)
  if (typeof json.date === "string") {
    return `${ formatDate(json.date) }-${ key }`
  }
  return key
}

function getAuthors(json) {
  if (typeof json.data.author === "string") {
    return [ json.data.author ]
  }
  if (Array.isArray(json.data.authors)) {
    return json.data.authors
  }
  return []
}

function getTags(json) {
  if (Array.isArray(json.data.tags)) {
    return json.data.tags
  }
  return []
}

export default function() {
  return {
    name: "phenomic-plugin-directory-collector",
    type: "collector",
    collect(db: PhenomicDB, name: string, json: any) {
      const pathSegments = name.split(path.sep)
      const collectionName = pathSegments[0]
      const key = getKey(name, json.data)
      debug(`collecting ${ key } for collection '${ collectionName }'`)
      const sortedKey = getSortedKey(name, json.data)
      return Promise.all([
        // full resource, not sorted
        db.put([ collectionName ], key, { ...json, id: key }),
        // sorted list
        db.put([ collectionName, "default" ], sortedKey, { id: key }),
        // sorted list, filtered by authors
        ...getAuthors(json).map(author => {
          return Promise.all([
            db.put([ collectionName, "authors", author ], sortedKey, { id: key }),
            db.put([ "authors", collectionName ], author, { id: author }),
          ])
        }),
        ...getTags(json).map(tag => {
          return Promise.all([
            // sorted list, filtered by tags
            db.put([ collectionName, "tags", tag ], sortedKey, { id: key }),
            // global tag list
            db.put([ "tags" ], tag, { id: tag }),
            db.put([ "tags", "default" ], tag, { id: tag }),
            db.put([ "tags", "collection", collectionName ], tag, { id: tag }),
          ])
        }),
      ])
    },
  }
}
