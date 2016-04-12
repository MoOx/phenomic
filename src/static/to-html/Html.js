import React, { Component, PropTypes } from "react"

export default class Html extends Component {

  static propTypes = {
    head: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    script: PropTypes.string.isRequired,
    manifest: PropTypes.string,
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  };

  static defaultProps = {
    manifest: "",
  };

  render() {
    const { manifest } = this.props

    const htmlProps = {
      lang: "en",
      ...(manifest !== "") && {
        manifest,
      },
    }
    return (
      <html {...htmlProps}>
        <head
          dangerouslySetInnerHTML={ {
            __html: this.props.head,
          } }
        />
        <body>
          <div
            id="phenomic"
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
