import React, { Component } from "react"

import styles from "./index.css"

export default class Footer extends Component {

  render() {
    return (
      <footer className={ styles.footer }>
        <a
          href="http://moox.io/statinamic/"
          className={ styles.link }
        >
          { "Cooked by " }
          <span className={ styles.reference }>
            {  "@MoOx" }
          </span>
        </a>
        { " | " }
        <a href="https://github.com/MoOx/statinamic">
          { "Source on GitHub" }
        </a>
      </footer>
    )
  }
}
