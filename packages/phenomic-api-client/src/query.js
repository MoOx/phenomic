/**
 * @flow
 */
import invariant from "invariant"

function query(config: PhenomicQueryConfig): PhenomicQueryConfig {
  invariant(
    typeof config.collection === "string",
    "A query must at least contain a collection"
  )
  if (typeof config.id === "string") {
    return {
      collection: config.collection,
      id: config.id,
    }
  }
  return {
    collection: config.collection,
    by: config.by || "default",
    value: config.by ? config.value : "1",
    order: config.order || "desc",
    limit: config.limit,
    ...config.hasOwnProperty("after") ? { after: config.after } : null,
  }
}

export default query
