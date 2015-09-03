import loaderUtils from "loader-utils"

import cache from "./cache"

function relativePath(path) {
  // remove cwd from resource path to relative path
  const cwd = process.cwd()
  if (path.indexOf(cwd) === 0) {
    path = path.substr(cwd.length + 1)
  }

  return path
}

export default function(input) {
  this.cacheable()

  const query = loaderUtils.parseQuery(this.query)
  const options =  query.jsonCollection
    ? query.jsonCollection
    : this.options.jsonCollection
      ? this.options.jsonCollection
      : {
        urlify: (url) => url,
      }

  cache.push({
    __filename: relativePath(this.resourcePath),
    __url: options.urlify(relativePath(this.resourcePath)),
    ...JSON.parse(input).head,
  })

  return input
}
