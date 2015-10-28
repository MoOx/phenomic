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

  const parsed = yamlHeaderParser(input)
  const relativePath = path.relative(context, this.resourcePath)
  const url = filenameToUrl(relativePath)
  const metadata = {
    __filename: relativePath,
    __url: path.join(basepath, url) + "/",
  }
  const mdObject = {
    head: {
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
  const collectionData = {
    ...mdObject.head,
    ...metadata,
  }
  if (previousIndex) {
    cache[previousIndex] = collectionData
  }
  else {
    cache.push(collectionData)
  }
  // emit updated collection
  this.emitFile(collectionUrl, JSON.stringify(cache, null, 2))

  return "module.exports = __webpack_public_path__ + " + JSON.stringify(jsonUrl)
}
