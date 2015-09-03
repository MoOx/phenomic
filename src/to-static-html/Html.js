import React, { Component } from "react"
import { PropTypes } from "react"

export default class Html extends Component {

  static propTypes = {
    body: PropTypes.string.isRequired,
    store: PropTypes.object.isRequired,
  }

  render() {
    return (
      <html lang="en">
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </head>
        <body>
          <div
            id="statinamic"
            dangerouslySetInnerHTML={{
              __html: this.props.body,
            }}
          />
          <script
            dangerouslySetInnerHTML={{
              __html: `window.__INITIAL_STATE__ = ${
                JSON.stringify({
                  ...this.props.store.getState(),

                  // skip some data \\
                  // ensure collection is not in all pages output
                  // async json file is prefered (file length concerns)
                  collection: undefined,
                  // already in bundle
                  pageComponents: undefined,
                })
              }`,
            }}
          />
          <script src="/index.js"></script>
        </body>
      </html>
    )
  }
}
