// @flow

import React from "react"
import { renderToString } from "react-dom/server"
import Helmet from "react-helmet"

type Props = {
  css: Array<string>,
  js: Array<string>,
  renderBody: () => React$Element<any>,
  renderScript: () => React$Element<any>,
}

const defaultHtmlAttributes = {
  "lang": "en",
}
const defaultMeta = [
  // <meta charset="utf-8" />
  { "charset": "utf-8" },
  // <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  { "http-equiv": "X-UA-Compatible", "content": "IE=edge" },
  // <meta name="viewport" content="width=device-width, initial-scale=1" />
  { "name": "viewport", "content": "width=device-width, initial-scale=1" },
]

const Html = (props: Props) => {
  // Inject default html metas before
  // Those need to be rendered somehow otherwise Helmet won't consider those
  renderToString(
    <Helmet
      htmlAttributes={ defaultHtmlAttributes }
      meta={ defaultMeta }
      link={ [
        ...props.css.map((file) => ({ rel: "stylesheet", href: file })),
      ] }
      script={ [
        ...props.js.map((file) => ({ src: file })),
      ] }
    />
  )

  // render body
  const body = props.renderBody()
  // rewind html metas
  const head = Helmet.rewind()

  // <!doctype html> is automatically prepended
  return (
    <html { ...head.htmlAttributes.toComponent() }>
      <head>
        { head.base.toComponent() }
        { head.title.toComponent() }
        { head.meta.toComponent() }
        { head.link.toComponent() }
      </head>
      <body>
        { body }
        { props.renderScript() }
        { head.script.toComponent() }
      </body>
    </html>
  )
}

export default Html
