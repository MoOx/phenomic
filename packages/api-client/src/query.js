import invariant from "invariant";

const debug = require("debug")("phenomic:api-client");

function query(config: PhenomicQueryConfig): PhenomicQueryConfig {
  invariant(
    typeof config.collection === "string",
    "A query must at least contain a collection"
  );
  debug("query", config);

  // note that during static build, we initiate the query with no id
  if (config.hasOwnProperty("id")) {
    return {
      collection: config.collection,
      id: config.id
    };
  }
  return {
    collection: config.collection,
    by: config.by || "default",
    value: config.by ? config.value : "1",
    order: config.order || "desc",
    limit: config.limit,
    ...(config.hasOwnProperty("after") ? { after: config.after } : null)
  };
}

export default query;
