---
title: How to use Collections in Phenomic
incomplete: true
---

By default, Phenomic provides two things to help you work with collections:

- it creates a file that contains all page metadata in a unique collection,
- it provides a helper that helps you filter/sort/limit the collection.

## Collection file

Here is a simple collection example; note that the metadata defines the
additional fields `__filename` & `__url`.

```json
[
  {
    "__filename": "index.md",
    "__url": "/",
    "title": "Awesome Website"
  },
  {
    "__filename": "blog/index.md",
    "__url": "/blog/",
    "title": "Awesome blog"
  },
  {
    "__filename": "blog/halloween.md",
    "__url": "/blog/halloween/",
    "title": "Awesome Halloween blog post",
    "layout": "Post",
    "date": "2015-10-31"
  },
  {
    "__filename": "blog/xmas.md",
    "__url": "/blog/xmas/",
    "title": "Awesome Christmas blog post",
    "layout": "Post",
    "date": "2015-12-25"
  },
]
```

As you can see, this file contains all pages, indexes and posts.

The easiest way to get some data is to use the Phenomic helper:

```js
// es6
import enhanceCollection from "phenomic/lib/enhance-collection"

// es5
var enhanceCollection = require("phenomic/lib/enhance-collection").default
```

With it, you can easily filter some pages anywhere in your components:

```js
enhanceCollection(collection, {
  filter: { layout: "Post" },
  sort: "date",
  reverse: true,
  // limit: 1,
})
```

So, where does this collection come from? Here is an example of a component
that will display posts, sorted by date, and other pages (that are not a post)
in a second list. You will see that the collection is retrieved from
[the context](https://facebook.github.io/react/docs/context.html).

```js
import React, { Component, PropTypes } from "react"

import Page from "Page"

import enhanceCollection from "phenomic/lib/enhance-collection"

export default class Collection extends Component {

  static propTypes = {
    head: PropTypes.object.isRequired,
    body: PropTypes.string,
  };

  static contextTypes = {
    collection: PropTypes.array,
  };

  render() {
    const {
      collection,
    } = this.context
    return (
      <div>
        <Page { ...this.props } />
        {
          Boolean(!collection || !collection.length) &&
          <div>
            { "No entry" }
          </div>
        }
        {
          Boolean(collection && collection.length) &&
          <div>
            { "Posts (by date)" }
            <ul>
            {
              enhanceCollection(collection, {
                filter: { layout: "Post" },
                sort: "date",
                reverse: true,
                // limit: 1,
              })
              .map((item) => {
                return (
                  <li key={ item.__url }>
                    <a href={ item.__url }>
                      { item.title }
                    </a>
                  </li>
                )
              })
            }
            </ul>

            { "Other pages" }
            <ul>
            {
              enhanceCollection(collection, {
                filter: ({ layout }) => layout !== "Post",
                sort: "title",
              })
              .map((item) => {
                return (
                  <li key={ item.__url }>
                    <a href={ item.__url }>
                      { item.title }
                    </a>
                  </li>
                )
              })
            }
            </ul>
          </div>
        }
      </div>
    )
  }
}
```
