---
title: Phenomic content API client
---

This module helps to call the content API.

Two modules are exported: `query` and `url`.

**Keep in mind that you will probably only use `query` via a plugin (eg: react)
and not even have to use `url` method yourself.**

## `query`

This module helps to normalize and validate a query. It takes an object as
argument and there is 2 ways to use it.

### Get a single item

As soon as you pass an `id` key in the argument, query is assumed to be a single
item query. The only other option accepted will be `path`.

```js
import { query } from "@phenomic/api-client";
// note that some plugin/preset re-export it directly, for convenience

// ...

const id = "some-id"; // might be assumed from url
const pageQuery = query({
  path: "content/pages", // allow to query a folder
  id
});
```

### Get multiple items

Unless you make a single item query (= no `id`), you will make a multiple items
query.

Queries accept multiple options:

* `path` (optional): folder you want to look in,
* `by` (optional): allow you to filter by a given key. Can be a metadata from
  your content (eg: `tags` from front-matter markdown files, `license` of some
  package.json etc).
* `value` (optional): make sense if you use `by` option. Allows you to filter a
  given value (eg: `{ by: 'tags', value: 'javascript' }`).
* `order` (optional): `"asc"` or `"desc"` (default to desc),
* `limit` (optional): allows to limit number of results for a query,
* `sort` (optional): allows to sort results on a metadata key, or via a
  [custom function name](https://phenomic.io/en/packages/core/docs/configuration/#dbsortfunctions),
* `after` (optional): allows to paginate result. This parameter is a hash that
  is pointing to specific place in the list for the given path. By not being a
  simple page number, this allows you to make immutable pagination. Renderer
  plugins should handle this argument perfectly and will generate all possible
  pages at any starting point (200 results without pagination will give you 200
  pages possibles, even if you will use less, according to your `limit`).

This query will get a list of 6 posts, after a given entry (= paginated query)

```js
const after = "/* read from the url, it's a base64 hash */";
const postsQuery = query({
  path: "content/posts",
  limit: 6,
  after // if undefined, will read return the 6 first posts
});
```

This query will get a list of 6 posts, filtered by tags with the value
`javascript`, after a given entry (= paginated query)

```js
const after = "/* read from the url, it's a base64 hash */";
const postsQuery = query({
  path: "content/posts",
  limit: 6,
  by: "tags",
  value: "javascript",
  after // if undefined, will read return the 6 first posts
});
```

## `url`

This module helps to transform the queries to url. It takes a query and return a
string. Usually used by plugin methods that will handle the query for you.
