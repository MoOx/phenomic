// @flow

import { createRoutes, formatPattern } from "react-router"
import colors from "chalk"
import urlJoin from "url-join"

import arrayUnique from "../../_utils/array-unique"

const defaultConsole = console.log

const flattenRoute = (route) => {
  // @todo remove the default route.path, user should use IndexRoute instead?
  let routesUrls = route.path ? [ route.path ] : []

  if (route.indexRoute) {
    routesUrls.push(route.path)
  }
  if (route.childRoutes) {
    const root = route.path
    route.childRoutes.forEach((route) => {
      routesUrls = [
        ...routesUrls,
        ...flattenRoute(route).map((r) => root ? urlJoin(root, r) : r),
      ]
    })
  }

  return routesUrls
}

// only simple types will be accepted
// array<string | number> | string | number
// other will be skipped
const paramsListFromCollection = (collection) => {
  const params = {}

  collection.forEach((item) => {
    if (!item.head) {
      return
    }

    Object.keys(item.head).forEach((key) => {
      // array<string | number>
      if (
        Array.isArray(item.head[key]) &&
        item.head[key].length &&
        (
          typeof item.head[key][0] === "string" ||
          typeof item.head[key][0] === "number"
        )
      ) {
        const k = key
          // categories => category
          .replace(/ies$/, "y")
          // tags => tag
          .replace(/s$/, "")

        if (!params[k]) {
          params[k] = []
        }
        params[k] = [
          ...params[k],
          ...item.head[key],
        ]
      }

      // string, number
      if (
        typeof item.head[key] === "string" ||
        typeof item.head[key] === "number"
      ) {
        if (!params[key]) {
          params[key] = []
        }
        params[key].push(item.head[key])
      }
    })
  })

  params.splat = collection.map((item) => item.__url)

  return params
}

const createUrlsFromParamsReplacementInUrl = (url, params, log) => {
  // don't compute anything if url doesn't seems to have dynamic parameters
  // react-router url params are like ``:that`` (or splat *)
  if (url.indexOf(":") === -1 && url.indexOf("*") === -1) {
    return [ url ]
  }

  const urls = []

  const possibleErrorEnd = `parameter for path "${ url }"`

  let missingKeys = []
  let nonMissingKeys = []

  Object.keys(params).forEach((paramName) => {
    params[paramName].forEach((paramValue) => {
      const urlParams = { [paramName]: paramValue }
      try {
        const hydratedUrl = formatPattern(url, urlParams)
        urls.push(hydratedUrl)
        nonMissingKeys.push(paramName)
      }
      catch (e) {
        // log(paramName, e.message)

        const matches = e.message.match(/Missing \"(.*)\" parameter for path/)
        if (matches && matches[1]) {
          missingKeys.push(matches[1])
        }

        if (
          e.message.indexOf("Missing") === 0 &&
          e.message.lastIndexOf(possibleErrorEnd) ===
            (e.message.length - possibleErrorEnd.length - 1)
        ) {
          throw e
        }
      }
    })
  })

  nonMissingKeys = arrayUnique(nonMissingKeys)
  missingKeys = arrayUnique(missingKeys).filter(
    (key) => nonMissingKeys.indexOf(key) === -1
  )
  if (missingKeys.length) {
    log("⚠️ " + colors.red(
      "It looks like some parameters can't be mapped to create routes: ",
      missingKeys.map((key) => ":" + key).join(", "),
    ))
  }

  // @todo improve the algorithm to avoid duplicates,
  // we will probably get better perfs

  return arrayUnique(urls.sort())
}

const hydrateRoutesUrls = (routesUrls, collection, log) => {
  const paramsList = paramsListFromCollection(collection)

  return routesUrls.reduce((acc, url) => {
    return [
      ...acc,
      ...createUrlsFromParamsReplacementInUrl(url, paramsList, log),
    ]
  }, [])
}

export default (
  routes: React$Element<any>,
  collection: PhenomicCollection,
  // for testing
  log: Function = defaultConsole,
): Array<string>  => {
  const flattenedRoutes = arrayUnique(
    createRoutes(routes).reduce((acc, r) => [ ...acc, ...flattenRoute(r) ], [])
  )

  if (flattenedRoutes.filter((url) => url.indexOf("*") > -1).length > 1) {
    throw new Error(
      "Phenomic can only handle one splat (*) in react-router routes. \n" +
      "You must use only one splat. If you have a specific need, do not "+
      "hesitate to open an issue at " +
      "https://github.com/MoOx/phenomic/issues/new"
    )
  }

  const normalizedRoutes = flattenedRoutes.map(
    (route) => "/" + route.replace(/^\/+/, "").replace(/\/+$/, "")
  )

  return hydrateRoutesUrls(normalizedRoutes, collection, log)
}
