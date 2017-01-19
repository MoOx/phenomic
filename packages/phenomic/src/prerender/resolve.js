/**
 * @flow
 */
// $FlowFixMe
const createQuery = require("phenomic-api-client/lib/query")

const resolveURLsForDynamicParams = async function(fetch: PhenomicFetch, route: PhenomicRoute) {
  if (!route.collection) {
    return route
  }
  const collection = await fetch(createQuery(typeof route.collection === "string" ? { collection: route.collection } : route.collection))
  const path = route.path || "*"
  return collection.list
    .map(item => {
      return {
        ...route,
        path: path.replace(/\*/, item.id),
        params: { splat: item.id },
      }
    })
}

const findPaginatedQuery = function(queries) {
  const key = Object.keys(queries).find(key => queries[key].hasOwnProperty("after"))
  if (!key) {
    return null
  }
  return queries[key]
}

const resolveNextURLsInPagination = async function(path: string, query: PhenomicQueryConfig, fetch: PhenomicFetch, urls: Array<string> = []) {
  urls = [ ...urls, path.replace("/:after?", query.after ? "/" + query.after : "") ]
  const nextPage = await fetch(createQuery(query))
  if (nextPage.hasNextPage) {
    return resolveNextURLsInPagination(
      path,
      { ...query, after: nextPage.next },
      fetch,
      urls
    )
  }
  else {
    return urls
  }
}

const resolvePaginatedURLs = async function(fetch: PhenomicFetch, route: PhenomicRoute) {
  if (!route.paginated) {
    return route.path
  }
  if (!route.getQueries) {
    return route.path
  }
  const initialRouteParams: Object = route.params || {}
  const initialRouteQuery = route.getQueries({ params: initialRouteParams })
  const query = findPaginatedQuery(initialRouteQuery)
  if (!query) {
    return route.path
  }
  return resolveNextURLsInPagination(route.path, query, fetch)
}

const flatten = (array: Array<any>) => {
  const flattenedArray = []
  array.forEach(item => {
    if (Array.isArray(item)) {
      flattenedArray.push(...flatten(item))
    }
    else {
      flattenedArray.push(item)
    }
  })
  return flattenedArray
}

const normalizePath = (path: string) => path.replace(/^\//, "")

const resolveURLsToPrerender = async function(routes: Array<PhenomicRoute>, fetch: PhenomicFetch) {
  const dynamicRoutes = await Promise.all(routes.map(route => resolveURLsForDynamicParams(fetch, route)))
  const paginatedURLs = await Promise.all(flatten(dynamicRoutes).map(route => resolvePaginatedURLs(fetch, route)))
  return flatten(paginatedURLs).map(normalizePath)
}

module.exports = resolveURLsToPrerender
