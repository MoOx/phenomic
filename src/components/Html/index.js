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
    />
  )

  // Glamor integration
  // https://github.com/threepointone/glamor/blob/master/docs/server.md
  let glamorRenderStatic
  try {
    // $FlowFixMe just ignore glamor as we don't have it as a dep
    glamorRenderStatic = require("glamor/server").renderStatic
  }
  catch (e) {
    // skip glamor if not working
  }

  // Aprodite
  // https://github.com/Khan/aphrodite#server-side-rendering
  let aproditeRenderStatic
  try {
    // $FlowFixMe just ignore aprodite as we don't have it as a dep
    aproditeRenderStatic = require("aphrodite").StyleSheetServer.renderStatic
  }
  catch (e) {
    // skip aprodite if not working
  }

  // render body
  let body
  if (glamorRenderStatic) {
    const glamorResult = glamorRenderStatic(() => props.renderBody())

    renderToString(
      <Helmet
        style={ [
          { "cssText": glamorResult.css },
        ] }
        script={ [
          { "innerHTML": `window._glamor = ${
            JSON.stringify(glamorResult.ids)
          }` },
        ] }
      />
    )
    body = glamorResult.html
  }
  else if (aproditeRenderStatic) {
    const aproditeResult = aproditeRenderStatic(() => props.renderBody())

    renderToString(
      <Helmet
        style={ [
          {
            "cssText": aproditeResult.css.content,
            "data-aphrodite": undefined,
          },
        ] }
        script={ [
          { "innerHTML": `window._aphrodite = ${
            JSON.stringify(aproditeResult.css.renderedClassNames)
          });` },
        ] }
      />
    )
    body = aproditeResult.html
  }

  body = body || props.renderBody()

  renderToString(
    <Helmet
      link={ [
        ...props.css.map((file) => ({ rel: "stylesheet", href: file })),
      ] }
      script={ [
        ...props.js.map((file) => ({ src: file })),
      ] }
    />
  )

  // rewind html metas
  const head = Helmet.rewind()

  // <!doctype html> is automatically prepended
  return (
    <html { ...head.htmlAttributes.toComponent() }>
      <head>
        { head.base.toComponent() }
        { head.title.toComponent() }
        { head.meta.toComponent() }
        { head.style.toComponent() }
        { head.link.toComponent() }
      </head>
      <body>
        <div id="phenomic" dangerouslySetInnerHTML={{ __html: body }} />
        { props.renderScript() }
        { head.script.toComponent() }
      </body>
    </html>
  )
}

export default Html
