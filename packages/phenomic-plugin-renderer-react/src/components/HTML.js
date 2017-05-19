import React from "react"

export type HtmlType = (props: PropsType) => React$Element<*>

type PropsType = {
  body: React$Element<*>,
  state?: React$Element<*>,
  script: React$Element<*>,
}

const Html = (props: PropsType) => (
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
