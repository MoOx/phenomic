import React, { Component } from "react"
import { Link } from "react-router"

import styles from "./index.css"
import TwitterSVG from "../icons/iconmonstr-twitter-1.svg"
import GitHubSVG from "../icons/iconmonstr-github-1.svg"

export default class Header extends Component {

  render() {
    return (
      <nav className={ styles.nav }>
        <div className={ styles.navPart1 }>
          <Link
            className={ styles.link }
            to="/"
          >
            { "Home" }
          </Link>
        </div>
        <div className={ styles.navPart2 }>
          <a
            href="https://twitter.com/Statinamic"
            className={ styles.link }
          >
            <TwitterSVG />
            { "Twitter" }
          </a>
          <a
            href="https://github.com/MoOx/statinamic"
            className={ styles.link }
          >
            <GitHubSVG />
            { "GitHub" }
          </a>
        </div>
      </nav>
    )
  }
}
