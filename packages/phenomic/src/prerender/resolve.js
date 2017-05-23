import createQuery from "phenomic-api-client/lib/query"

const debug = require("debug")("phenomic:core:prerender:resolve")

const resolveURLsForDynamicParams = async function(
  phenomicFetch: PhenomicFetch,
  route: PhenomicRoute,
) {
  const collectionConfig = typeof route.collection === "string"
    ? { collection: route.collection }
    : route.collection
  if (!collectionConfig) {
    debug("no valid collection", route.collection)
    return route
  }
  debug(
    `fetching collection '${collectionConfig.collection ? collectionConfig.collection : Object.keys(collectionConfig).join(",")}' for route '${route.path}'`,
  )
  const collection = await phenomicFetch(createQuery(collectionConfig))
  debug(`collection fetched. ${collection.list.length} items`)
  const path = route.path || "*"
  return collection.list.map(item => {
    return {
      ...route,
      path: path.replace(/\*/, item.id),
      params: { splat: item.id },
    }
  })
}

const findPaginatedQuery = function(queries) {
  const key = Object.keys(queries).find(key =>
    queries[key].hasOwnProperty("after"),
  )
  if (!key) {
    return null
  }
  return queries[key]
}

const resolveNextURLsInPagination = async function(
  path: string,
  query: PhenomicQueryConfig,
  phenomicFetch: PhenomicFetch,
  urls: Array<string> = [],
) {
  urls = [
    ...urls,
    path.replace("/:after?", query.after ? "/" + query.after : ""),
  ]
  const nextPage = await phenomicFetch(createQuery(query))
  if (nextPage.hasNextPage) {
    return resolveNextURLsInPagination(
      path,
      { ...query, after: nextPage.next },
      phenomicFetch,
      urls,
    )
  } else {
    return urls
  }
}

const resolvePaginatedURLs = async function(
  fetch: PhenomicFetch,
  route: PhenomicRoute,
) {
  if (!route.paginated) {
    return route.path
  }
  if (!route.component.getQueries) {
    return route.path
  }
  const initialRouteParams: Object = route.params || {}
  const initialRouteQuery = route.component.getQueries({
    params: initialRouteParams,
  })
  const query = findPaginatedQuery(initialRouteQuery)
  if (!query) {
    return route.path
  }
  return resolveNextURLsInPagination(route.path, query, fetch)
}

const flatten = (array: Array<any>) => {
  const flattenedArray = []
  array.forEach(item => {
    Array.isArray(item)
      ? flattenedArray.push(...flatten(item))
      : flattenedArray.push(item)
  })
  return flattenedArray
}

const normalizePath = (path: string) => path.replace(/^\//, "")

const resolveURLsToPrerender = async function(
  routes: Array<PhenomicRoute>,
  fetch: PhenomicFetch,
) {
  const dynamicRoutes = await Promise.all(
    routes.map(route => resolveURLsForDynamicParams(fetch, route)),
  )
  const paginatedURLs = await Promise.all(
    flatten(dynamicRoutes).map(route => resolvePaginatedURLs(fetch, route)),
  )
  return flatten(paginatedURLs).map(normalizePath)
}

export default resolveURLsToPrerender
