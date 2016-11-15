/* eslint-disable max-len */
export default () => (
      `<!doctype html>
<html lang="en">

<head>
  <title data-react-helmet="true"></title>
  <meta data-react-helmet="true" charset="utf-8" />
  <meta data-react-helmet="true" http-equiv="X-UA-Compatible" content="IE=edge" />
  <meta data-react-helmet="true" name="viewport" content="width=device-width, initial-scale=1" />
  <link data-react-helmet="true" rel="stylesheet" href="/test.css" />
</head>

<body>
  <div id="phenomic">
    <p data-reactroot="" data-reactid="1" data-react-checksum="305402615">TestContainer</p>
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
  <script data-react-helmet="true" src="/test.js"></script>
</body>

</html>`
)
