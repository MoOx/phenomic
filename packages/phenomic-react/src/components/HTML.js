const React = require("react")

const HTML = (props) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {props.head && props.head.title.toComponent()}
      {props.head && props.head.meta.toComponent()}
      {props.head && props.head.link.toComponent()}
    </head>
    <body>
      <div
        dangerouslySetInnerHTML={{
          __html: `<div id="PhenomicRoot">${ props.body || "" }</div>`,
        }}
      />
      {props.state &&
        <script
          id="Hydration"
          type="text/json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(props.state),
          }}
        />
      }
      <script src="/bundle.js" async></script>
    </body>
  </html>
)

module.exports = HTML
