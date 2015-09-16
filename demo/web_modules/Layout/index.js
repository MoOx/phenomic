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
    ga("create", pkg.statinamic.googleAnalyticsUA, "auto")
    this.logPageview()

  }

  componentWillReceiveProps(props) {
    if (props.params.splat !== this.props.params.splat) {
      this.logPageview()
    }
  }

  logPageview() {
    ga("send", "pageview")
    if (__DEV__) {
      console.info("New pageview", window.location.href)
    }
  }

  render() {
    return (
      <div className={styles.wrapper}>
        <nav className={styles.nav}>
          <Link to="/">Home</Link>
          {" | "}
          <Link to="/docs/setup">Setup</Link>
          {" | "}
          <Link to="/docs/usage">Usage</Link>
        </nav>
        {this.props.children}
        <footer className={styles.footer}>
          {"© 2015 - "}
          <a href="http://moox.io/">@MoOx</a>
        </footer>
        <GoogleAnalyticsInitiailizer />
      </div>
    )
  }
}
