import test from "ava"; import "babel-core/register"

import url from "url"
import {
  html as beautifyHTML,
  default_options as defaultOptions,
} from "js-beautify"
import React from "react"
import { Route } from "react-router"
import { createStore } from "redux"

import urlAsHtml from "../url-as-html"
import htmlMetas from "../../../html-metas"

const TestContainer = () => (
  <p>{ "TestContainer" }</p>
)

const testStore = createStore(
  (state) => (state),
  {
    pages: {
      "": {
        home: "page",
      },
    },
  }
)

const fixture = {
  metadata: {},
  routes: (
    <Route path="*" component={ TestContainer } />
  ),
  store: testStore,
  baseUrl: url.parse("http://0.0.0.0:3000/"),
}

const htmlOptions = {
  ...defaultOptions,
  indent_size: 2,
}

test("url as html", async (t) => {
  urlAsHtml("", fixture, true)
  .then((html) => {
    const expectedHTML = (
`<!doctype html>
<html lang="en">

<head>
  ${ htmlMetas("static", { baseUrl: { path: "/" } }).join("\n  ") }
  <title data-react-helmet="true"></title>
</head>

<body>
  <div id="statinamic">
    <div id="statinamic-container">
      <p>TestContainer</p>
    </div>
  </div>
  <script>
    window.__INITIAL_STATE__ = {
      "pages": {
        "": {
          "home": "page"
        }
      }
    }
  </script>
  <script src="/statinamic-client.js"></script>
</body>

</html>`
    )
    // console.log(beautifyHTML(html, htmlOptions))
    // console.log(expectedHTML)
    t.is(
      beautifyHTML(html, htmlOptions),
      expectedHTML
    )
  })
  .catch((error) => {
    t.fail(error)
  })
})
