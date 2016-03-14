// @flow
import React from "react"
import ReactDOMserver from "react-dom/server"
import RedBox from "redbox-react"

const renderer = (error: Object): string => {
  const component = ReactDOMserver.renderToStaticMarkup(
      React.createElement(RedBox, {
        error,
      })
    )
  return `<!doctype html><html><body>${ component }</body></html>`
}

export default renderer
