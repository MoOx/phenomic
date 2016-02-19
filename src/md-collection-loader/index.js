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
import yamlHeaderParser from "gray-matter"
import markdownIt from "markdown-it"

import joinUri from "../_utils/join-uri"
import urlify from "../_utils/urlify"
import enhanceCollection from "../enhance-collection"
import feed from "./feed"
import cache from "./cache"

let timeout

module.exports = function(input) {

  const query = loaderUtils.parseQuery(this.query)
  const context = query.context || this.options.context

  const basepath = query.basepath || "/"
  const mdIt = query.markdownIt
    ? query.markdownIt
    : this.options.markdownIt
      ? this.options.markdownIt
      : markdownIt()

  const defaultHead = query.defaultHead
  const parsed = yamlHeaderParser(input)

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

  const dataUrl = resourceUrl + ".json"

  const metadata = {
    __filename: relativePath,
    __url: joinUri(basepath, url),
    __resourceUrl: joinUri(basepath, resourceUrl),
    __dataUrl: joinUri(basepath, dataUrl),
  }
  const mdObject = {
    head: {
      ...defaultHead,
      ...parsed.data,
    },
    body: mdIt.render(parsed.content),
    rawBody: parsed.content,
    raw: parsed.orig,
    ...metadata,
  }

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

  return "module.exports = __webpack_public_path__ + " + JSON.stringify(dataUrl)
}
