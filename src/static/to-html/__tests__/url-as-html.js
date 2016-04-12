import test from "ava"

import url from "url"

import beautifyHTML from "../../../_utils/beautify-html"
import htmlMetas from "../../../_utils/html-metas"

import urlAsHtml from "../url-as-html"

import collection from "./fixtures/collection.js"
import store from "./fixtures/store.js"

test("url as html", async (t) => {
  urlAsHtml(
    "/",
    {
      exports: {
        routes: require.resolve("./fixtures/routes.js"),
      },
      collection,
      store,
      baseUrl: url.parse("http://0.0.0.0:3000/"),
      assetsFiles: {
        js: [ "phenomic-client.js" ],
      },
    },
    true
  )
  .then((html) => {
    const expectedHTML = (
`<!doctype html>
<html lang="en">

<head>
  ${ htmlMetas({ baseUrl: { pathname: "/" } }).join("\n  ") }
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
      "pages": {
        "/": {
          "home": "page"
        }
      }
    }
  </script>
  <script src="/phenomic-client.js"></script>
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
    t.fail(error.message)
  })
})
