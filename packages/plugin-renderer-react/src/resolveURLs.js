import fetchRestApi from "@phenomic/api-client/lib/fetch";
import query from "@phenomic/api-client/lib/query";
import { encode } from "@phenomic/core/lib/api/helpers";


const defaultQueryKey = "default";
const mainKey = "id";
const debug = require("debug")("phenomic:plugin:renderer-react");

const arrayUnique = array => [...new Set(array)];

const flatten = (array: $ReadOnlyArray<any>) => {
  const flattenedArray = [];
  array.forEach(item => {
    if (Array.isArray(item)) flattenedArray.push(...flatten(item));
    else flattenedArray.push(item);
  });

  return flattenedArray;
};

const getRouteQueries = route => {
  if (
    // reference is incorrect? (eg: import { Thing } instead of import Thing)
    !route.component ||
    // no export?
    (Object.keys(route.component).length === 0 &&
      // $FlowFixMe we know, u don't
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

const getMainQuery = (routeQueries, route) => {
  const keys = Object.keys(routeQueries);
  const firstKey = keys[0];
  const firstKeyAsInt = parseInt(firstKey, 10);
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

const resolveURLsForDynamicParams = async function(route: PhenomicRoute) {
  // If the path doesn't contain any kind of parameter, no need to
  // iterate over the path
  if (!route.path.includes("*") && !route.path.includes(":")) {
    debug("not a dynamic route");
    return route;
  }

  const routeQueries = getRouteQueries(route);
  const mainQuery = getMainQuery(routeQueries, route);
  if (!mainQuery.item) {
    debug("no query detected for", route.path);
    return route;
  }

  debug(route.path, `fetching path '${mainQuery.key}'`, routeQueries);
  let key =
    (routeQueries[mainQuery.key] && routeQueries[mainQuery.key].by) || mainKey;
  if (key === defaultQueryKey) {
    key = mainKey;
  }
  let queryResult;
  try {
    queryResult = await fetchRestApi(query({ path: mainQuery.item.path }));
  } catch (e) {
    // log simple-json-fetch error if any
    throw e.error || e;
  }
  debug(
    route.path,
    `path fetched. ${queryResult.list.length} items (id: ${key})`
  );
  // get all possible values for the query
  const list = arrayUnique(
    queryResult.list.reduce((acc, item) => {
      if (!item[key]) return acc;
      if (Array.isArray(item[key])) acc = acc.concat(item[key]);
      else acc.push(item[key]);
      return acc;
    }, [])
  );
  debug(route.path, "list (unique)", list);
  const urlsData = list.reduce((acc, value) => {
    let resolvedPath = route.path.replace(":" + key, value);
    let params = { [key]: value };

    // try * if url has not param
    if (key === mainKey && resolvedPath === route.path) {
      resolvedPath = resolvedPath.replace("*", value);
      // react-router splat is considered as the id
      params = { splat: value };
    }
    if (route.path !== resolvedPath)
      acc.push({ ...route, path: resolvedPath, params });
    return acc;
  }, []);

  debug(route.path, "urls data", urlsData);

  // if no data found, we still try to render something
  const finalUrlsData = urlsData.length ? urlsData : [{ path: route.path }];
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

const resolveURLsToPrerender = async function({
  routes
}: {
  routes: $ReadOnlyArray<PhenomicRoute>
}) {
  const dynamicRoutes = await Promise.all(
    routes.map(route => resolveURLsForDynamicParams(route))
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
