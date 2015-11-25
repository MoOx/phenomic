import React, { Component } from "react"

import styles from "./index.css"

export default class Footer extends Component {

  render() {
    return (
      <footer className={ styles.footer }>
        { "© 2015 - " }
        <a href="http://moox.io/">{ "@MoOx" }</a>
        { "  |  " }
        <a href="https://github.com/MoOx/statinamic">
          { "Check out on GitHub" }
        </a>
      </footer>
    )
  }
}
