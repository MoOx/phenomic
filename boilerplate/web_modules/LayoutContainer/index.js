import React, { Component } from "react"
import { PropTypes } from "react"
import Helmet from "react-helmet"

import Header from "Header"
import Footer from "Footer"

import styles from "./index.css"

export default class LayoutContainer extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  render() {
    const {
      pkg,
    } = this.context.metadata

    return (
      <div className={ styles.wrapper }>
        <Helmet
          meta={ [
            { property: "og:site_name", content: pkg.name },
            { name: "twitter:site", content: `@${ pkg.twitter }` },
          ] }
        />
        <Header />
        { this.props.children }
        <Footer />
      </div>
    )
  }
}
