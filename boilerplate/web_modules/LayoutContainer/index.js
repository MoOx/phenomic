import React, { Component } from "react"
import { PropTypes } from "react"
import Helmet from "react-helmet"

import Header from "../Header"
import Footer from "../Footer"

import styles from "./index.css"

export default class Layout extends Component {

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
      <div className={ styles.layout }>
        <Helmet
          meta={ [
            { property: "og:site_name", content: pkg.name },
            { name: "twitter:site", content: `@${ pkg.twitter }` },
          ] }
        />
        <Header />
        <div className={ styles.content }>
          { this.props.children }
        </div>
        <Footer />
      </div>
    )
  }
}
