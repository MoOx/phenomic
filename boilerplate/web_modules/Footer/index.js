import React, { Component } from "react"
import { Link } from "react-router"

import styles from "./index.css"

export default class Footer extends Component {

  render() {
    return (
      <footer className={ styles.footer }>
        <a
          href={ process.env.PHENOMIC_HOMEPAGE }
          className={ styles.link }
        >
          { "Powered by " }
          <span className={ styles.reference }>
            {  `<${ process.env.PHENOMIC_NAME} />` }
          </span>
        </a>

        { " | " }
        { "Pages: " }
        <Link
          className={ styles.link }
          to="/404.html"
        >
          { "404" }
        </Link>
        { ", " }
        <Link
          className={ styles.link }
          to="/loading/"
        >
          { "Loading" }
        </Link>
      </footer>
    )
  }
}
