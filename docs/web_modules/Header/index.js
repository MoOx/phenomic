import React, { Component } from "react"
import { Link } from "react-router"
import cx from "classnames"

import styles from "./index.css"
import npmPkg from "../../../package.json"
import StatinamicLogoSVG from "../../../logo/statinamic-text.svg"

export default class Header extends Component {

  render() {
    return (
      <header>
        <div className={ styles.logo }>
          <StatinamicLogoSVG width="100%" height="auto" />
        </div>
        <nav className={ styles.nav }>
          <Link
            className={ styles.link }
            activeClassName={ styles.linkActive }
            to="/statinamic/"
          >
            { "Home" }
          </Link>
          <Link
            className={ styles.link }
            activeClassName={ styles.linkActive }
            to="/statinamic/docs/setup/"
          >
            { "Setup" }
          </Link>
          <Link
            className={ styles.link }
            activeClassName={ styles.linkActive }
            to="/statinamic/docs/usage/"
          >
            { "Usage" }
          </Link>
          <Link
            className={ styles.link }
            activeClassName={ styles.linkActive }
            to="/statinamic/docs/faq/"
          >
            { "FAQ" }
          </Link>
          <span className={ styles.separator }>{ "|" }</span>
          <a
            className={ styles.link }
            href="https://github.com/MoOx/statinamic"
          >
            { "GitHub" }
          </a>
          <a
            className={ styles.link }
            href="https://twitter.com/Statinamic"
          >
            { "Twitter" }
          </a>
          <a
            className={ styles.link }
            href={ "https://gitter.im/MoOx/statinamic" }
          >
            { "Support" }
          </a>
          <a
            className={ cx(styles.link, styles.version) }
            href={
              "https://github.com/MoOx/statinamic/blob/master/CHANGELOG.md"
            }
          >
            { `v${ npmPkg.version }` }
          </a>
        </nav>
      </header>
    )
  }
}
