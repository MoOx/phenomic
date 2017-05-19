import React from "react"
import ReactDOMServer from "react-dom/server"

import DefaultHtml from "../components/HTML"
import type { HtmlType } from "../components/HTML"

type renderHTMLType = (
  props: { body?: string, state?: Object },
  html?: HtmlType,
) => string

const renderHTML: renderHTMLType = (props, Html = DefaultHtml) => {
  const html = (
    <Html
      body={
        <div
          dangerouslySetInnerHTML={{
            __html: `<div id="PhenomicRoot">${props.body || ""}</div>`,
          }}
        />
      }
      state={
        props.state &&
          <script
            id="Hydration"
            type="text/json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(props.state),
            }}
          />
      }
      script={<script src="/bundle.js" async />}
    />
  )
  return `<!DOCTYPE html>${ReactDOMServer.renderToStaticMarkup(html)}`
}

export default renderHTML
