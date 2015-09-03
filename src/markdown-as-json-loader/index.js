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
import loaderUtils from "loader-utils"

import yamlHeaderParser from "gray-matter"
import markdownIt from "markdown-it"

export default function(source) {
  this.cacheable()

  const query = loaderUtils.parseQuery(this.query)
  const md =  query.markdownIt
    ? query.markdownIt
    : this.options.markdownIt
      ? this.options.markdownIt
      : markdownIt()

  const parsed = yamlHeaderParser(source)

  return JSON.stringify({
    head: parsed.data,
    body: md.render(parsed.content),
    rawBody: parsed.content,
    raw: parsed.orig,
  })
}
