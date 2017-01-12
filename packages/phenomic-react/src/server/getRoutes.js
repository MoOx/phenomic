const React = require("react")
const RouteUtils = require("react-router/lib/RouteUtils")

function flattenRoutes(routes, path = "") {
  return routes.reduce((acc, route) => {
    const nextRoute = {
      ...route,
      path: (route.path || "").startsWith("/") ? route.path : path + "/" + (route.path || ""),
    }
    if(route.childRoutes) {
      acc.push(...flattenRoutes(nextRoute.childRoutes, nextRoute.path))
    } else {
      acc.push(nextRoute)
    }
    return acc
  }, [])
}

function getRoutes(app) {
  const routes = RouteUtils.createRouteFromReactElement(app.routes)
  const flatRoutes = flattenRoutes(routes.childRoutes)
  return flatRoutes.map(item => ({ ...item, getQuery: item.component.getQueries }))
}

module.exports = getRoutes
