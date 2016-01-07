import React, { Component } from "react"
import { PropTypes } from "react"
import Helmet from "react-helmet"
import invariant from "invariant"

// function pageDescription(text) {
//   return text
// }

import styles from "./index.css"

export default class Page extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    __filename: PropTypes.string.isRequired,
    __url: PropTypes.string.isRequired,
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {
    const {
      pkg,
    } = this.context.metadata

    const {
      __filename,
      __url,
      head,
      body,
    } = this.props

    invariant(
      typeof head.title === "string",
      `Your page '${ __filename }' needs a title`
    )

    const meta = [
      { property: "og:title", content: head.title },
      { property: "og:type", content: "article" },
      { property: "og:url", content: __url },
      // { property: "og:description", content: pageDescription(body) },
      { name: "twitter:card", content: "summary" },
      { name: "twitter:title", content: head.title },
      { name: "twitter:creator", content: `@${ pkg.twitter }` },
      // { name: "twitter:description", content: pageDescription(body) },
    ]

    return (
      <div>
        <Helmet
          title={ head.title }
          meta={ meta }
        />

        {
          head.title &&
          <h1>{ head.title }</h1>
        }
        {
          head.incomplete &&
          <div className={ styles.callout + " " + styles.calloutInfo }>
            <strong className={ styles.calloutTitle }>{ "Incomplete" }</strong>
            {
              "This documentation is still a work in progress and might be " +
              "incomplete."
            }
          </div>
        }
        {
          body &&
          <div
            dangerouslySetInnerHTML={ { __html: body } }
          />
        }
        { this.props.children }
      </div>
    )
  }
}
