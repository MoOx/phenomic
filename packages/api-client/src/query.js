const debug = require("debug")("phenomic:api-client");

function removeUndefined<T: {}>(obj: T): T {
  const newObj = {};
  // $FlowFixMe stfu
  Object.keys(obj).forEach(key => {
    if (typeof obj[key] !== undefined) {
      newObj[key] = obj[key];
    }
  });
  // $FlowFixMe stfu
  return newObj;
}

function query(config: PhenomicQueryConfig): PhenomicQueryConfig {
  debug("query", config);

  // note that during static build, we initiate the query with no id
  if (config.id !== undefined) {
    return {
      path: config.path,
      id: config.id
    };
  }

  return removeUndefined({
    path: config.path,
    by: config.by || "default",
    value: config.by && config.value ? config.value : "1",
    order: config.order ? config.order : "desc",
    limit: config.limit ? parseInt(config.limit, 10) : undefined,
    after: config.after
  });
}

export default query;
