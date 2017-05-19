import React from "react"

const Html = (props: PhenomicHtmlPropsType) => (
  <html>
    <head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </head>
    <body>
      {props.body}
      {props.state}
      {props.script}
    </body>
  </html>
)

export default Html
