// @flow

import resolveUrlsFromPhenomicApi from "./resolveUrlsFromPhenomicApi";

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

const resolveUrlsForDynamicParams = async function(route: PhenomicRoute) {
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
        "Check the component reference and its origin. Are the import/export correct?",
    );
  }
  const maybeResolvedRoute = await resolveUrlsFromPhenomicApi(route);
  if (maybeResolvedRoute !== false) {
    return maybeResolvedRoute;
  }

  if (route.component.getAllPossibleUrls) {
    return await route.component.getAllPossibleUrls({ path: route.path });
  }

  return route.path;
};

const normalizePath = (path: string) => path.replace(/^\//, "");

const resolveUrls = async function({
  routes,
}: {
  routes: $ReadOnlyArray<PhenomicRoute>,
}) {
  const dynamicRoutes = await Promise.all(
    routes.map(route => resolveUrlsForDynamicParams(route)),
  );
  const flattenedDynamicRoutes = flatten(dynamicRoutes);
  const filtredDynamicRoutes = flattenedDynamicRoutes.filter(url => {
    if (url.includes("*")) {
      debug(
        `${url} is including a '*' but it has not been resolved: url is skipped`,
      );
      return false;
    }
    return true;
  });

  const normalizedURLs = filtredDynamicRoutes.map(normalizePath);
  debug("normalize urls", normalizedURLs);
  return arrayUnique(normalizedURLs);
};

export default resolveUrls;
