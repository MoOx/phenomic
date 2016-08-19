import htmlMetas from "../../../../../_utils/html-metas"

export default () => (
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
      "pages": {
        "/": {
          "home": "page"
        }
      }
    }
  </script>
  <script src="/test.js"></script>
</body>

</html>`
)
