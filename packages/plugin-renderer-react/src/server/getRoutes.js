import urlJoin from "url-join";
import { createRouteFromReactElement } from "react-router/lib/RouteUtils";

const debug = require("debug")("phenomic:plugin:react");

function flattenRoutes(routes, path = "") {
  debug("flattenRoutes");

  return routes.reduce((acc, route) => {
    const nextRoute = {
      ...route,
      path: (route.path || "").startsWith("/")
        ? route.path
        : route.path ? urlJoin(path, route.path) : path
    };
    if (route.childRoutes) {
      acc.push(...flattenRoutes(nextRoute.childRoutes, nextRoute.path));
    } else {
      acc.push(nextRoute);
    }
    return acc;
  }, []);
}

function getRoutes(app: PhenomicAppType) {
  const routes = createRouteFromReactElement(app.routes);
  const flatRoutes = flattenRoutes(routes.childRoutes);
  debug(flatRoutes);
  return flatRoutes;
}

export default getRoutes;
