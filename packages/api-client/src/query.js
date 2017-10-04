const debug = require("debug")("phenomic:api-client");

function query(config: PhenomicQueryConfig): PhenomicQueryConfig {
  debug("query", config);

  // note that during static build, we initiate the query with no id
  if (config.hasOwnProperty("id")) {
    return {
      path: config.path,
      id: config.id
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
