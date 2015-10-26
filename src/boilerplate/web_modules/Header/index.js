import React, { Component } from "react"
import { Link } from "react-router"

import styles from "./index.css"

export default class Header extends Component {

  render() {
    return (
      <nav className={ styles.nav }>
        <Link
          className={ styles.link }
          to="/"
        >
          { "Home" }
        </Link>
      </nav>
    )
  }
}
