import React, { Component } from "react"
import { PropTypes } from "react"

import { Link } from "react-router"

import styles from "./index.css"

export default class Layout extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
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
      </div>
    )
  }
}
