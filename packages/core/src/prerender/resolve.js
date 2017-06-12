import createQuery from "@phenomic/api-client/lib/query";

const debug = require("debug")("phenomic:core:prerender:resolve");

const resolveURLsForDynamicParams = async function(
  phenomicFetch: PhenomicFetch,
  route: PhenomicRoute
) {
  const collectionConfig = typeof route.collection === "string"
    ? { collection: route.collection }
    : route.collection;
  debug("route", route.path);
  if (!collectionConfig) {
    debug("no valid collection", route.collection);
    return route;
  }
  // If the path doesn't contain any kind of parameter, no need to
  // iterate over the collection
  if (!route.path.includes("*") && !route.path.includes(":")) {
    debug("not a dynamic route");
    return route;
  }
  debug(
    `fetching collection '${collectionConfig.collection
      ? collectionConfig.collection
      : Object.keys(collectionConfig).join(",")}' for route '${route.path}'`
  );
  // @todo memoize for perfs and avoid uncessary call
  const collection = await phenomicFetch(createQuery(collectionConfig));
  debug(`collection fetched. ${collection.list.length} items`);
  const path = route.path || "*";
  return collection.list.map(item => {
    return {
      ...route,
      path: path.replace(/\*/, item.key),
      params: { splat: item.key }
    };
  });
};

const findPaginatedQuery = function(queries) {
  const key = Object.keys(queries).find(key =>
    queries[key].hasOwnProperty("after")
  );
  if (!key) {
    return null;
  }
  return queries[key];
};

const resolveNextURLsInPagination = async function(
  path: string,
  query: PhenomicQueryConfig,
  phenomicFetch: PhenomicFetch,
  urls: Array<string> = []
) {
  urls = [
    ...urls,
    path.replace("/:after", query.after ? "/" + query.after : "")
  ];
  debug(path, query.after);
  const nextPage = await phenomicFetch(createQuery(query));
  if (nextPage.hasNextPage) {
    debug(path, "have a next page");
    return resolveNextURLsInPagination(
      path,
      { ...query, after: nextPage.next },
      phenomicFetch,
      urls
    );
  } else {
    return urls;
  }
};

const resolvePaginatedURLs = async function(
  fetch: PhenomicFetch,
  route: PhenomicRoute
) {
  if (!route.paginated) {
    debug(route.path, "is not paginated");
    return route.path;
  }
  if (!route.component.getQueries) {
    debug(route.path, "is paginated but have no queries");
    return route.path;
  }
  const initialRouteParams: Object = route.params || {};
  const initialRouteQuery = route.component.getQueries({
    params: initialRouteParams
  });
  const query = findPaginatedQuery(initialRouteQuery);
  if (!query) {
    debug(route.path, "is paginated with queries, but no :after param found");
    return route.path;
  }
  return resolveNextURLsInPagination(route.path, query, fetch);
};

const flatten = (array: Array<any>) => {
  const flattenedArray = [];
  array.forEach(item => {
    Array.isArray(item)
      ? flattenedArray.push(...flatten(item))
      : flattenedArray.push(item);
  });

  return flattenedArray;
};

const normalizePath = (path: string) => path.replace(/^\//, "");

const resolveURLsToPrerender = async function(
  routes: Array<PhenomicRoute>,
  fetch: PhenomicFetch
) {
  const dynamicRoutes = await Promise.all(
    routes.map(route => resolveURLsForDynamicParams(fetch, route))
  );
  const flattenedDynamicRoutes = flatten(dynamicRoutes);
  const filtredDynamicRoutes = flattenedDynamicRoutes.filter(url => {
    if (url.path && url.path.includes("*") && !url.collection) {
      debug(
        `${url.path} is including a '*' but it has not been resolved: url is skipped`
      );
      return false;
    }
    return true;
  });
  const paginatedURLs = await Promise.all(
    filtredDynamicRoutes.map(route => resolvePaginatedURLs(fetch, route))
  );
  const normalizedURLs = flatten(paginatedURLs).map(normalizePath);
  const uniqsNormalizedPath = [...new Set(normalizedURLs)];
  return uniqsNormalizedPath;
};

export default resolveURLsToPrerender;
