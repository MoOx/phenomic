const React = require("react")
const ReactDOMServer = require("react-dom/server")

const HTML = require("../components/HTML")

function renderHTML(props) {
  const tree = <HTML { ...props } />
  return `<!DOCTYPE html>${ ReactDOMServer.renderToStaticMarkup(tree) }`
}

module.exports = renderHTML
