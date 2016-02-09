import React, { Component } from "react"
import { PropTypes } from "react"

import ga from "react-google-analytics"
const GoogleAnalyticsInitiailizer = ga.Initializer

const isProduction = process.env.NODE_ENV === "production"
const isClient = typeof window !== "undefined"

export default class GoogleAnalyticsTracker extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    params: PropTypes.object.isRequired,
  };

  static contextTypes = {
    metadata: PropTypes.object.isRequired,
  };

  componentWillMount() {
    if (isClient) {
      const { pkg } = this.context.metadata
      if (isProduction) {
        ga("create", pkg.googleAnalyticsUA, "auto")
      }
      else {
        console.info("ga.create", pkg.googleAnalyticsUA)
      }
      this.logPageview()
    }
  }

  componentWillReceiveProps(props) {
    if (props.params.splat !== this.props.params.splat) {
      this.logPageview()
    }
  }

  logPageview() {
    if (isClient) {
      if (isProduction) {
        ga("send", "pageview")
      }
      else {
        console.info("New pageview", window.location.href)
      }
    }
  }

  render() {
    return (
      <div>
        { this.props.children }
        <GoogleAnalyticsInitiailizer />
      </div>
    )
  }
}
