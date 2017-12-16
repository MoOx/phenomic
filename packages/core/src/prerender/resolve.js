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
  const ids = Object.keys(routeQueries);
  const firstId = ids[0];
  const firstIdAsInt = parseInt(ids[0], 10);
  // parseInt("12.") == "12"
  if (
    // $FlowFixMe it's on purpose
    firstIdAsInt == firstId &&
    String(firstIdAsInt).length == firstId.length
  ) {
    console.warn(`The main path used for ${route.path} is ${firstId}`);
  }
  return { id: firstId, item: routeQueries[firstId] };
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
  if (!mainQuery.item || !mainQuery.item.path) {
    debug("no valid path detected for", route.path);
    return route;
  }

  const pathConfig = { path: mainQuery.item.path };
  debug("route", route.path);

  // If the path doesn't contain any kind of parameter, no need to
  // iterate over the path
  if (!route.path.includes("*") && !route.path.includes(":")) {
    debug("not a dynamic route");
    return route;
  }
  debug(
    `fetching path '${
      mainQuery.id ? mainQuery.id : Object.keys(pathConfig).join(",")
    }' for route '${route.path}'`
  );
  // @todo memoize for perfs and avoid uncessary call
  const queries = getRouteQueries(route);
  debug(route.path, queries);
  let id = (queries[mainQuery.id] && queries[mainQuery.id].by) || mainKey;
  if (id === defaultQueryKey) {
    id = mainKey;
  }
  const queryParams = query(pathConfig);
  const queryResult = await phenomicFetch(queryParams);
  debug(
    route.path,
    `path fetched. ${queryResult.list.length} items (id: ${id})`
  );
  const path = route.path || "*";
  const list = queryResult.list.reduce((acc, item) => {
    if (!item[id]) {
      return acc;
    }
    if (Array.isArray(item[id])) {
      acc = acc.concat(item[id]);
    } else {
      acc.push(item[id]);
    }
    return acc;
  }, []);
  debug(path, "list (unique)", arrayUnique(list));
  const urlsData = arrayUnique(list).reduce((acc, value) => {
    let resolvedPath = path.replace(":" + id, value);
    let params = { [id]: value };

    // try *
    if (id === mainKey && resolvedPath === path) {
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

  // try :after with id
  const reAfter = /:after\b/;

  return finalUrlsData.reduce((acc, routeData) => {
    if (!routeData.path.match(reAfter)) {
      acc.push(routeData);
    } else {
      queryResult.list.map(item => {
        // $FlowFixMe params[id] act as a truthy value
        if (routeData.params && routeData.params[id]) {
          if (
            (Array.isArray(item[id]) &&
              item[id].includes(routeData.params[id])) ||
            item[id] === routeData.params[id]
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
