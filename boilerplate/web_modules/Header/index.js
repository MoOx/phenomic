import React, { Component } from "react"
import { Link } from "react-router"

import styles from "./index.css"
import Svg from "react-svg-inline"
import twitterSvg from "../icons/iconmonstr-twitter-1.svg"
import gitHubSvg from "../icons/iconmonstr-github-1.svg"

export default class Header extends Component {

  render() {
    return (
      <header className={ styles.header }>
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
              <Svg svg={ twitterSvg } />
              { "Twitter" }
            </a>
            <a
              href="https://github.com/MoOx/statinamic"
              className={ styles.link }
            >
              <Svg svg={ gitHubSvg } />
              { "GitHub" }
            </a>
          </div>
        </nav>
      </header>
    )
  }
}
