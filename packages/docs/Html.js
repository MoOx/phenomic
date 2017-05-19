import React from "react"
import Head from "react-helmet"

export type HtmlPropsType = {
  body: React$Element<*>,
  state?: React$Element<*>,
  script: React$Element<*>,
}

const Html = (props: HtmlPropsType) => {
  const helmet = Head.renderStatic()
  return (
    <html {...helmet.htmlAttributes.toComponent()}>
      <head>
        {helmet.base.toComponent()}
        {helmet.title.toComponent()}
        {helmet.meta.toComponent()}
        {helmet.link.toComponent()}
        {helmet.style.toComponent()}
        {helmet.script.toComponent()}
        {helmet.noscript.toComponent()}
      </head>
      <body {...helmet.bodyAttributes.toComponent()}>
        {props.body}
        {props.state}
        {props.script}
      </body>
    </html>
  )
}

export default Html
