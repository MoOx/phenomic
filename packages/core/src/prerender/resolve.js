import createQuery from "@phenomic/api-client/lib/query";

const debug = require("debug")("phenomic:core:prerender:resolve");

const arrayUnique = array => [...new Set(array)];

const getRouteQueries = route => {
  const initialRouteParams: Object = route.params || {};
  if (!route.component.getQueries) {
    debug(route.path, "have no queries");
    return {};
  }
  return route.component.getQueries({
    params: initialRouteParams
  });
};

const getMainCollection = route => {
  const keys = Object.keys(getRouteQueries(route));
  const firstKey = keys[0];
  const firstKeyAsInt = parseInt(keys[0], 10);
  // parseInt("12.") == "12"
  if (
    // $FlowFixMe it's on purpose
    firstKeyAsInt == firstKey &&
    String(firstKeyAsInt).length == firstKey.length
  ) {
    console.warn(`The main collection used for ${route.path} is ${firstKey}`);
  }
  return firstKey;
};

const resolveURLsForDynamicParams = async function(
  phenomicFetch: PhenomicFetch,
  route: PhenomicRoute
) {
  // deprecate notice
  // @todo remove for stable v1
  if (route.collection) {
    console.error(
      `${route.path} have an attached parameter 'collection=$route.collection'.\n This parameter is now useless and can be safely removed`
    );
  }

  const collectionConfig = { collection: getMainCollection(route) };
  debug("route", route.path);
  if (!collectionConfig.collection) {
    debug("no valid collection detected for", route.path);
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
  const query = getRouteQueries(route);
  debug(route.path, query);
  const key =
    (query[collectionConfig.collection] &&
      query[collectionConfig.collection].by) ||
    "key";
  const collection = await phenomicFetch(createQuery(collectionConfig));
  debug(route.path, `collection fetched. ${collection.list.length} items`);
  const path = route.path || "*";
  const list = collection.list.reduce((acc, item) => {
    if (!item[key]) {
      return acc;
    }
    if (Array.isArray(item[key])) {
      acc = acc.concat(item[key]);
    } else {
      acc.push(item[key]);
    }
    return acc;
  }, []);
  debug(route.path, "list (unique)", arrayUnique(list));
  return arrayUnique(list).map(value => {
    let resolvedPath = path.replace(":" + key, value);
    let params = { [key]: value };
    // try *
    if (key === "key" && resolvedPath === path) {
      resolvedPath = resolvedPath.replace("*", value);
      params = { splat: value };
    }
    return {
      ...route,
      path: resolvedPath,
      params
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

  const query = findPaginatedQuery(getRouteQueries(route));
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
