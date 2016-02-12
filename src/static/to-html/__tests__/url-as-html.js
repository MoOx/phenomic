import test from "ava"; import "babel-core/register"

import url from "url"

import beautifyHTML from "../../../__tests__/utils/beautifyHTML"
import htmlMetas from "../../../html-metas"

import urlAsHtml from "../url-as-html"

import { testStore, testRoutes } from "./utils"

const fixture = {
  metadata: {},
  routes: testRoutes,
  store: testStore,
  baseUrl: url.parse("http://0.0.0.0:3000/"),
  assetsFiles: {
    js: [ "statinamic-client.js" ],
  },
}

test("url as html", async (t) => {
  urlAsHtml("", fixture, true)
  .then((html) => {
    const expectedHTML = (
`<!doctype html>
<html lang="en">

<head>
  ${ htmlMetas({ baseUrl: { path: "/" } }).join("\n  ") }
  <title data-react-helmet="true"></title>
</head>

<body>
  <div id="statinamic">
    <div id="statinamic-container">
      <p>TestContainer</p>
    </div>
  </div>
  <script>
    window.__COLLECTION__ = [];
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
    // console.log(beautifyHTML(html))
    // console.log(expectedHTML)
    t.is(
      beautifyHTML(html),
      expectedHTML
    )
  })
  .catch((error) => {
    t.fail(error)
  })
})
