import invariant from "invariant";

const debug = require("debug")("phenomic:api-client");

function query(config: PhenomicQueryConfig): PhenomicQueryConfig {
  invariant(
    typeof config.path === "string",
    "A query must at least contain a path"
  );
  debug("query", config);

  // note that during static build, we initiate the query with no id
  if (config.hasOwnProperty("id")) {
    return {
      path: config.path && encodeURIComponent(config.path),
      id: config.id && encodeURIComponent(config.id)
    };
  }
  return {
    path: config.path,
    by: config.by || "default",
    value: config.by && config.value ? config.value : "1",
    order: config.order ? config.order : "desc",
    limit: config.limit ? parseInt(config.limit, 10) : undefined,
    ...(config.hasOwnProperty("after") && config.after
      ? { after: config.after }
      : null)
  };
}

export default query;
