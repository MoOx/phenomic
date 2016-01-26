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
          { "Powered by " }
          <span className={ styles.reference }>
            {  "<Statinamic />" }
          </span>
        </a>
      </footer>
    )
  }
}
