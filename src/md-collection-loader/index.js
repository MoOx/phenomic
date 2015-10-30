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

import filenameToUrl from "../filename-to-url"
import feed from "../feed"
import enhanceCollection from "../enhance-collection"
import cache from "./cache"

export default function(input) {

  const query = loaderUtils.parseQuery(this.query)
  const context = query.context || this.options.context

  const collectionUrl = query.collectionUrl || "collection.json"
  const basepath = query.basepath || "/"
  const mdIt = query.markdownIt
    ? query.markdownIt
    : this.options.markdownIt
      ? this.options.markdownIt
      : markdownIt()

  const defaultHead = query.defaultHead
  const parsed = yamlHeaderParser(input)
  const relativePath = path.relative(context, this.resourcePath)
  const url = filenameToUrl(relativePath)
  const metadata = {
    __filename: relativePath,
    __url: path.join(basepath, url) + "/",
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

  const jsonUrl = path.join(url, "index.json")

  if (!this.emitFile) {
    throw new Error("emitFile is required from module system")
  }

  // emit file
  this.emitFile(jsonUrl, JSON.stringify(mdObject))

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

  // emit updated collection
  this.emitFile(
    collectionUrl,
    // we emit a collection that contains only header info + metadata
    JSON.stringify(cache.map((item) => ({
      ...item.head,
      __filename: item.__filename,
      __url: item.__url,
    })))
  )

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
      collection: enhanceCollection(cache, collectionOptions),
    }))
  })

  return "module.exports = __webpack_public_path__ + " + JSON.stringify(jsonUrl)
}
