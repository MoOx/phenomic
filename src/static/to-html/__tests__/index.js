import test from "ava"; import "babel-core/register"

import beautifyHTML from "../../../_utils/beautify-html"
import htmlMetas from "../../../_utils/html-metas"

import toHTML, { writeAllHTMLFiles } from "../index"

import { testStore, testRoutes } from "./utils"

test("don't break if there is nothing to transform", async (t) => {
  toHTML({
    urls: [],
    // metadata: {},
    // collection: [],
    // destination: "destination",
    // routes: {},
    // store: {},
    // baseUrl: { pathname: "/" },
  })
  .then((files) => {
    t.is(files.length, 0)
  })
  .catch((error) => {
    t.fail(error)
  })
})

test("writeAllHTMLFiles", (t) => {
  t.plan(4)

  return writeAllHTMLFiles({
    // metadata: {},
    urls: [
      "test-url",
    ],
    collection: [
      {
        __url: "/test-url",
        __resourceUrl: "/test-url/index.html",
      },
    ],
    assetsFiles: {
      js: [ "statinamic-client.js" ],
      css: [ "statinamic-client.css" ],
    },
    store: testStore,
    exports: {
      routes: testRoutes,
    },
    destination: "destination",
    baseUrl: { pathname: "/" },
    ghPages: true,
    setPageData: (url, /* , collection, store */) => {
      t.is(url, "/test-url")
    },
    writeHTMLFile: (filename, html) => {
      const expectedHTML = (
      `<!doctype html>
<html lang="en">

<head>
  ${ htmlMetas({
    baseUrl: { pathname: "/" },
    css: [ "statinamic-client.css" ] }).join("\n  ") }
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
      "pages": {}
    }
  </script>
  <script src="/statinamic-client.js"></script>
</body>

</html>`
      )
      t.is(filename, "destination/test-url/index.html")
      t.is(
        beautifyHTML(html),
        expectedHTML
      )
    },
    forgetPageData: (url) => {
      t.is(url, "/test-url")
    },
  }, true)
  .catch((error) => {
    t.fail(error)
  })
})
