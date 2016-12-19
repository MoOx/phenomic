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

const Html = (props: Props) => {

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
          };` },
        ] }
      />
    )
    body = aproditeResult.html
  }

  body = body || props.renderBody()

  // rewind html metas
  const head = Helmet.rewind()

  // <!doctype html> is automatically prepended
  return (
    <html
      lang="en"
      { ...head.htmlAttributes.toComponent() }
    >
      <head>
        { head.base.toComponent() }
        { head.title.toComponent() }
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        { head.meta.toComponent() }
        { head.style.toComponent() }
        { head.link.toComponent() }
        {
          props.css.map((file, i) => (
            <link key={ "phenomic.css." + i } rel="stylesheet" href={ file } />
          ))
        }
        { head.script.toComponent() }
      </head>
      <body>
        <div id="phenomic" dangerouslySetInnerHTML={{ __html: body }} />
        { props.renderScript() }
        {
          props.js.map((file, i) => (
            <script key={ "phenomic.js." + i } src={ file } />
          ))
        }
      </body>
    </html>
  )
}

export default Html
