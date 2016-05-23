import React, { Component, PropTypes } from "react"
import Helmet from "react-helmet"

import Header from "../Header"
import Footer from "../Footer"
import GoogleAnalyticsTracker from "../GoogleAnalyticsTracker"

import styles from "./index.css"
import "./hightlightjs.css"

export default class Layout extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    params: PropTypes.object,
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {
    const {
      pkg,
    } = this.context.metadata

    return (
      <GoogleAnalyticsTracker params={ this.props.params }>
        <Helmet
          link={ [
            { "rel": "icon", "href": "/assets/favicon.png" },
          ] }
          meta={ [
            {
              name: "generator", content: `${
              process.env.PHENOMIC_NAME } ${ process.env.PHENOMIC_VERSION }`,
            },
            { property: "og:site_name", content: pkg.name },
            { name: "twitter:site", content: `@${ pkg.twitter }` },
          ] }
          script={ [
            { src: "https://cdn.polyfill.io/v2/polyfill.min.js" },
          ] }
        />
        <div className={ styles.layout }>
          <Header />
          <div className={ styles.content }>
            { this.props.children }
          </div>
          <Footer />
        </div>
      </GoogleAnalyticsTracker>
    )
  }
}
