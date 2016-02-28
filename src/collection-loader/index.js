/*
Example
```md
  ---
  title: Test
  key: value
  ---
  _Md_ content
```
return a object:
```json
{
  __filename: ...
  __url: ...
  __resourceUrl: ...
  __dataUrl: ...
  head: {
    title: "Test",
    key: "value",
  },
  body: "<em>Md</em> content",
  rawBody: "_Md_ content",
  raw: {initial content},
}
```
 */
import path from "path"
import loaderUtils from "loader-utils"
import fontMatterParser from "gray-matter"

import joinUri from "../_utils/join-uri"
import urlify from "../_utils/urlify"
import enhanceCollection from "../enhance-collection"
import feed from "./feed"
import cache from "./cache"
import description from "./description"
import validator from "./validator"

let timeout

module.exports = function(input) {
  const loaderQuery = loaderUtils.parseQuery(this.query)
  const query = {
    ...loaderQuery,
    ...this.options.statinamic && this.options.statinamic.collection,
  }

  validator(
    loaderQuery,
    "collection-loader query",
    this.emitError
  )

  if (this.options.statinamic) {
    validator(
      this.options.statinamic.collection,
      "statinamic.collection",
      this.emitError
    )
  }

  const context = query.context || this.options.context

  const renderer = query.renderer || ((text) => text)

  const defaultHead = query.defaultHead
  const parsed = fontMatterParser(input)

  const relativePath = path.relative(context, this.resourcePath)
  const tmpUrl = urlify(
    parsed.data.route
      // custom route
      ? parsed.data.route
      // default route
      : relativePath
  )

  const url = urlify(tmpUrl)
  const resourceUrl = urlify(tmpUrl, true)

  const hash = loaderUtils.getHashDigest(input)
  const dataUrl = resourceUrl + "." + hash + ".json"

  const metadata = {
    __filename: relativePath,
    __url: joinUri("/", url),
    __resourceUrl: joinUri("/", resourceUrl),
    __dataUrl: joinUri("/", dataUrl),
  }
  let mdObject = {
    head: {
      ...defaultHead,
      ...parsed.data,
    },
    body: renderer(parsed.content),
    rawBody: parsed.content,
    raw: parsed.orig,
    ...metadata,
  }

  mdObject = description(mdObject, query.description)

  if (!this.emitFile) {
    throw new Error("emitFile is required from module system")
  }

  // emit file
  this.emitFile(dataUrl, JSON.stringify(mdObject))

  // update collection
  // replace or add depending on the cache state
  let previousIndex
  cache.forEach((md, index) => {
    if (md.__filename === relativePath) {
      previousIndex = index
    }
  })
  if (previousIndex) {
    cache[previousIndex] = mdObject
  }
  else {
    cache.push(mdObject)
  }

  if (timeout) {
    clearTimeout(timeout)
  }
  else {
    setTimeout(() => {
      // emit updated feeds
      const feeds = query.feeds || []
      const feedsOptions = query.feedsOptions || {}
      Object.keys(feeds).forEach((name) => {
        const { feedOptions, collectionOptions } = feeds[name]
        this.emitFile(name, feed({
          feedOptions: {
            ...feedsOptions,
            ...feedOptions,
          },
          destination: name,
          collection: enhanceCollection(
            cache.map((item) => ({
              ...item.head,
              description: item.body,
              __url: item.__url,
            })),
            collectionOptions
          ),
        }))
      })
    }, 100)
  }

  return "module.exports = " + JSON.stringify(joinUri("/", dataUrl))
}
