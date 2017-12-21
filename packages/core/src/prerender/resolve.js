import query from "@phenomic/api-client/lib/query";

import { encode } from "../api";

const debug = require("debug")("phenomic:core:prerender:resolve");

const defaultQueryKey = "default";
const mainKey = "id";

const arrayUnique = array => [...new Set(array)];

const flatten = (array: Array<any>) => {
  const flattenedArray = [];
  array.forEach(item => {
    Array.isArray(item)
      ? flattenedArray.push(...flatten(item))
      : flattenedArray.push(item);
  });

  return flattenedArray;
};

const getRouteQueries = route => {
  if (
    // reference is incorrect? (eg: import { Thing } instead of import Thing)
    !route.component ||
    // no export?
    (Object.keys(route.component).length === 0 &&
      route.component.constructor === Object)
  ) {
    throw new Error(
      `Route with path '${
        route.path
      }' have no component (or an undefined value).\n` +
        "Check the component reference and its origin. Are the import/export correct?"
    );
  }
  const initialRouteParams: Object = route.params || {};
  if (!route.component.getQueries) {
    debug(route.path, "have no queries");
    return {};
  }
  return route.component.getQueries({
    params: initialRouteParams
  });
};

const getMainQuery = route => {
  const routeQueries = getRouteQueries(route);
  const keys = Object.keys(routeQueries);
  const firstKey = keys[0];
  const firstKeyAsInt = parseInt(keys[0], 10);
  // parseInt("12.") == "12"
  if (
    // $FlowFixMe it's on purpose
    firstKeyAsInt == firstKey &&
    String(firstKeyAsInt).length == firstKey.length
  ) {
    console.warn(`The main path used for ${route.path} is ${firstKey}`);
  }
  return { key: firstKey, item: routeQueries[firstKey] };
};

const resolveURLsForDynamicParams = async function(
  phenomicFetch: PhenomicFetch,
  route: PhenomicRoute
) {
  // deprecate notice
  // @todo remove for stable v1
  if (route.paginated) {
    console.log(
      "'paginated' parameter is deprecated. Pagination is now infered from the presence of :after param in the route."
    );
  }
  if (route.collection) {
    console.error(
      // $FlowFixMe removed from interface but it's for deprecation that we use it
      `${route.path} have an attached parameter 'collection=${
        route.collection
      }'.\n This parameter is now useless and can be safely removed`
    );
  }

  const mainQuery = getMainQuery(route);
  if (!mainQuery.item) {
    debug("no valid path detected for", route.path);
    return route;
  }

  const unlimitedQueryConfig = { path: mainQuery.item.path };
  debug("route", route.path);

  // If the path doesn't contain any kind of parameter, no need to
  // iterate over the path
  if (!route.path.includes("*") && !route.path.includes(":")) {
    debug("not a dynamic route");
    return route;
  }
  debug(
    `fetching path '${
      mainQuery.key
        ? mainQuery.key
        : Object.keys(unlimitedQueryConfig).join(",")
    }' for route '${route.path}'`
  );
  // @todo memoize for perfs and avoid uncessary call
  const queries = getRouteQueries(route);
  debug(route.path, queries);
  let key = (queries[mainQuery.key] && queries[mainQuery.key].by) || mainKey;
  if (key === defaultQueryKey) {
    key = mainKey;
  }
  const queryParams = query(unlimitedQueryConfig);
  const queryResult = await phenomicFetch(queryParams);
  debug(
    route.path,
    `path fetched. ${queryResult.list.length} items (id: ${key})`
  );
  const path = route.path || "*";
  const list = queryResult.list.reduce((acc, item) => {
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
  debug(path, "list (unique)", arrayUnique(list));
  const urlsData = arrayUnique(list).reduce((acc, value) => {
    let resolvedPath = path.replace(":" + key, value);
    let params = { [key]: value };

    // try *
    if (key === mainKey && resolvedPath === path) {
      resolvedPath = resolvedPath.replace("*", value);
      // react-router splat is considered as the id
      params = { splat: value };
    }

    debug("half resolved path", resolvedPath, params);

    if (path !== resolvedPath) {
      acc.push({
        ...route,
        path: resolvedPath,
        params
      });
    }

    return acc;
  }, []);

  debug(path, "urls data", urlsData);

  // if no data found, we still try to render something
  const finalUrlsData = urlsData.length ? urlsData : [{ path }];
  // try :after with key
  const reAfter = /:after\b/;

  return finalUrlsData.reduce((acc, routeData) => {
    if (!routeData.path.match(reAfter)) {
      acc.push(routeData);
    } else {
      queryResult.list.map(item => {
        // $FlowFixMe params[key] act as a truthy value
        if (routeData.params && routeData.params[key]) {
          if (
            (Array.isArray(item[key]) &&
              item[key].includes(routeData.params[key])) ||
            item[key] === routeData.params[key]
          ) {
            acc.push({
              ...routeData,
              path: routeData.path.replace(reAfter, encode(item.id))
            });
          }
        } else {
          acc.push({
            ...routeData,
            path: routeData.path.replace(reAfter, encode(item.id))
          });
        }
      });
    }

    return acc;
  }, []);
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
    if (url.path && url.path.includes("*")) {
      debug(
        `${
          url.path
        } is including a '*' but it has not been resolved: url is skipped`
      );
      return false;
    }
    return true;
  });
  // debug("filtred dynamic routes", filtredDynamicRoutes)

  const normalizedURLs = filtredDynamicRoutes.map(routeData =>
    normalizePath(routeData.path)
  );
  debug("normalize urls", normalizedURLs);
  const uniqsNormalizedPath = [...new Set(normalizedURLs)];
  return uniqsNormalizedPath;
};

export default resolveURLsToPrerender;
