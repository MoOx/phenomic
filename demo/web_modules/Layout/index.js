import React, { Component } from "react"
import { PropTypes } from "react"

import styles from "./index.css"

import Header from "Header"
import Footer from "Footer"
import GoogleAnalyticsTracker from "GoogleAnalyticsTracker"

export default class Layout extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    params: PropTypes.object,
  }

  render() {
    return (
      <GoogleAnalyticsTracker params={ this.props.params }>
        <div className={ styles.wrapper }>
          <Header />
          { this.props.children }
          <Footer />
        </div>
      </GoogleAnalyticsTracker>
    )
  }
}
