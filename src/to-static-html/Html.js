import React, { Component } from "react"
import { PropTypes } from "react"

export default class Html extends Component {

  static propTypes = {
    head: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    script: PropTypes.string.isRequired,
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  }

  render() {
    return (
      <html lang="en">
        <head
          dangerouslySetInnerHTML={ {
            __html: this.props.head,
          } }
        />
        <body>
          <div
            id="statinamic"
            dangerouslySetInnerHTML={ {
              __html: this.props.body,
            } }
          />
          <script
            dangerouslySetInnerHTML={ {
              __html: this.props.script,
            } }
          />
          { this.props.children }
        </body>
      </html>
    )
  }
}
