import React, { Component } from "react"
import { PropTypes } from "react"

import { Link } from "react-router"

import styles from "./index.css"
import pkg from "../../package.json"

import ga from "react-google-analytics"
const GoogleAnalyticsInitiailizer = ga.Initializer

export default class Layout extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    params: PropTypes.object,
  }

  componentWillMount() {
    if (__PROD__) {
      ga("create", pkg.googleAnalyticsUA, "auto")
    }
    if (__DEV__) {
      console.info("ga.create", pkg.googleAnalyticsUA)
    }
    this.logPageview()
  }

  componentWillReceiveProps(props) {
    if (props.params.splat !== this.props.params.splat) {
      this.logPageview()
    }
  }

  logPageview() {
    if (__PROD__) {
      ga("send", "pageview")
    }
    if (__DEV__ && typeof window !== "undefined") {
      console.info("New pageview", window.location.href)
    }
  }

  render() {
    return (
      <div className={ styles.wrapper }>
        <nav className={ styles.nav }>
          <Link to="/statinamic/">{ "Home" }</Link>
          { " | " }
          <Link to="/statinamic/docs/setup/">{ "Setup" }</Link>
          { " | " }
          <Link to="/statinamic/docs/usage/">{ "Usage" }</Link>
          { " | " }
          <Link to="/statinamic/docs/faq/">{ "FAQ" }</Link>
          { " | " }
          <a href="https://github.com/MoOx/statinamic">{ "GitHub" }</a>
          { " | " }
          <a href="https://twitter.com/MoOx">{ "Twitter" }</a>
        </nav>
        { this.props.children }
        <footer className={ styles.footer }>
          { "© 2015 - " }
          <a href="http://moox.io/">{ "@MoOx" }</a>
          { "  |  " }
          <a href="https://github.com/MoOx/statinamic">
            { "Check out on GitHub" }
          </a>
        </footer>
        <GoogleAnalyticsInitiailizer />
      </div>
    )
  }
}
