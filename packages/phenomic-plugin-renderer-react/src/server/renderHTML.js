import React from "react"
import ReactDOMServer from "react-dom/server"

import Html from "../components/HTML"

function renderHTML(props) {
  const tree = <Html { ...props } />
  return `<!DOCTYPE html>${ ReactDOMServer.renderToStaticMarkup(tree) }`
}

export default renderHTML
