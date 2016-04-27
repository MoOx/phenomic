import path from "path"
import test from "ava"

import beautifyHTML from "../../../_utils/beautify-html"
import htmlMetas from "../../../_utils/html-metas"

import collection from "./fixtures/collection.js"
import store from "./fixtures/store.js"

import toHTML, { writeAllHTMLFiles } from "../index"

test("don't break if there is nothing to transform", async (t) => {
  toHTML({
    urls: [],
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
    urls: [
      "/test-url",
    ],
    routes: require("./fixtures/routes.js").default,
    collection,
    store,
    assetsFiles: {
      js: [ "test.js" ],
      css: [ "test.css" ],
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
    css: [ "test.css" ] }).join("\n  ") }
  <title data-react-helmet="true"></title>
</head>

<body>
  <div id="phenomic">
    <p>TestContainer</p>
  </div>
  <script>
    window.__COLLECTION__ = [{
      "__url": "/",
      "__resourceUrl": "/index.html"
    }, {
      "__url": "/test-url",
      "__resourceUrl": "/test-url/index.html"
    }];
    window.__INITIAL_STATE__ = {
      "pages": {}
    }
  </script>
  <script src="/test.js"></script>
</body>

</html>`
      )
      t.is(filename, path.join("destination", "test-url", "index.html"))
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
