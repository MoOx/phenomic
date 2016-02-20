import React, { Component } from "react"
import { Link } from "react-router"
import cx from "classnames"

import styles from "./index.css"
import npmPkg from "../../../package.json"
import SVG from "react-svg-inline"
import statinamicLogoSVG from "../../../logo/statinamic-text.svg"
import twitterSVG from "./iconmonstr-twitter-1.svg"
import starSVG from "./iconmonstr-start.svg"

export default class Header extends Component {

  render() {
    return (
      <header className={ styles.header }>
        <div className={ styles.logo }>
          <SVG
            svg={ statinamicLogoSVG }
            width="100%" height="auto"
            fill="#fff"
            cleanup
          />
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
          <a
            className={ styles.link }
            href={ "https://gitter.im/MoOx/statinamic" }
          >
            { "Support 💬" }
          </a>
        </nav>
        <div className={ styles.social }>
          <a
            target="_blank" className="mx-SocialButton"
            href="https://github.com/MoOx/statinamic"
          >
            <span className={ "mx-SocialButton-icon" } >
              <SVG
                svg={ starSVG }
                width={ "1rem" }
                fill={ "currentColor" }
                cleanup
              />
            </span>
            <span className={ "mx-SocialButton-text" }>
              { "Star on GitHub" }
            </span>
          </a>
          { " " }
          <a
            target="_blank" className={ "mx-SocialButton" }
            href="https://twitter.com/Statinamic"
          >
            <span className={ "mx-SocialButton-icon" } >
              <SVG
                svg={ twitterSVG }
                width={ "1rem" }
                fill={ "#55acee" }
                cleanup
              />
            </span>
            <span className={ "mx-SocialButton-text" }>
              { "Follow @Statinamic" }
            </span>
          </a>
        </div>
        <a
          className={ cx(styles.link, styles.version) }
          href={
            "https://github.com/MoOx/statinamic/blob/master/CHANGELOG.md"
          }
        >
          { `v${ npmPkg.version }` }
        </a>
      </header>
    )
  }
}
