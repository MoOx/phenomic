import React, { Component } from "react"
import { Link } from "react-router"

import styles from "./index.css"

export default class Footer extends Component {

  render() {
    return (
      <footer className={ styles.footer }>
        <a
          className={ styles.link }
          href="http://moox.io/"
        >
          { "Cooked by " }
          <span className={ styles.reference }>
            {  "@MoOx" }
          </span>
        </a>
        { " | " }
        <a
          className={ styles.link }
          href="https://github.com/MoOx/statinamic"
        >
          { "Source on GitHub" }
        </a>
        { " | " }
        <a
          className={ styles.link }
          href="https://twitter.com/Phenomic"
        >
          { "News on Twitter" }
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
