import React from "react"
import { Route, IndexRoute } from "react-router"

import routesToUrls from "../index.js"

const Noop = () => {
  // return <div />
}

const collection: PhenomicCollection = [
  {
    __url: "/one",
    head: {
      key: "value",
      authors: [
        "John",
        "Jack",
      ],
      "categories": [
        "Random",
        "Stuff",
      ],
      "tags": [
        "programming",
        "life",
      ],
    },
  },
  {
    __url: "/two",
    head: {
      key: "value2",
      authors: [
        "John",
        "James",
      ],
      "categories": [
        "Random",
        "Things",
      ],
      "tags": [
        "programming",
        "puppy",
      ],
    },
  },
  {
    "__url": "/日本語.html",
  },
  {
    "__url": "/héhé/",
  },
]

const routes = (
  <Route component={ Noop }>
    <Route path="/author">
      <IndexRoute component={ Noop } />
      <Route path=":author" component={ Noop } />
    </Route>
    <Route path="blog" component={ Noop }>
      <Route path="category/:category" component={ Noop } />
      <Route path="/tag/:tag/" component={ Noop } />
    </Route>
    <Route path="key/:key" component={ Noop } />
    <Route path="*" component={ Noop } />
  </Route>
)

it("generate a list of routes based on tags", () => {
  jest.resetModules()

  const urls = routesToUrls(routes, collection)

  expect(
    urls
  ).toEqual(
    [
      "/author",
      "/author/Jack",
      "/author/James",
      "/author/John",
      "/blog",
      "/blog/category/Random",
      "/blog/category/Stuff",
      "/blog/category/Things",
      "/blog/tag/life",
      "/blog/tag/programming",
      "/blog/tag/puppy",
      "/key/value",
      "/key/value2",
      "/%E6%97%A5%E6%9C%AC%E8%AA%9E.html",
      "/h%C3%A9h%C3%A9/",
      "/one",
      "/two",
    ]
  )
})

const routesNoMatches = (
  <Route component={ Noop }>
    <Route path="/no-match/:lol" component={ Noop } />
    <Route path="*" component={ Noop } />
  </Route>
)

it("log message if there is no matches", (done) => {
  routesToUrls(routesNoMatches, collection, (log) => {
    if (log.includes(
      "It looks like some parameters can't be mapped to create routes:  :lol"
    )) {
      done()
    }
  })
})
