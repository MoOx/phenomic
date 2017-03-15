import { createRouteFromReactElement } from "react-router/lib/RouteUtils"

const debug = require("debug")("phenomic:plugin:react")

function flattenRoutes(routes, path = "") {
  debug("flattenRoutes")

  return routes.reduce((acc, route) => {
    const nextRoute = {
      ...route,
      path: (route.path || "").startsWith("/") ? route.path : path + "/" + (route.path || ""),
    }
    if (route.childRoutes) {
      acc.push(...flattenRoutes(nextRoute.childRoutes, nextRoute.path))
    }
    else {
      acc.push(nextRoute)
    }
    return acc
  }, [])
}

function getRoutes(app) {
  const routes = createRouteFromReactElement(app.routes)
  const flatRoutes = flattenRoutes(routes.childRoutes)
  return flatRoutes.map(item => ({ ...item, getQuery: item.component.getQueries }))
}

export default getRoutes
