import React, { Component } from "react"
import Link from "phenomic/lib/Link"
import cx from "classnames"

import styles from "./index.css"
import npmPkg from "../../../package.json"
import Svg from "react-svg-inline"
import phenomicLogoSvg from "../../../logo/phenomic-text-white.svg"
import twitterSvg from "./iconmonstr-twitter-1.svg"
import starSvg from "./iconmonstr-start.svg"

export default class Header extends Component {

  render() {
    return (
      <header className={ styles.header }>
        <div className={ styles.logo }>
          <Svg
            svg={ phenomicLogoSvg }
            width="100%" height="auto"
            fill="#fff"
            cleanup
          />
          { "Formerly" } <strong>{ "Statinamic" }</strong>{ " " }
          <small>
            <a
              href={ "https://github.com/MoOx/statinamic/issues/306" }
              style={ { color: "inherit" } }
              title="Read more about this change"
            >
              { "+" }
            </a>
          </small>
        </div>
        <nav className={ styles.nav }>
          <Link
            className={ styles.link }
            activeClassName={ styles.linkActive }
            to="/"
          >
            { "Home" }
          </Link>
          <Link
            className={ styles.link }
            activeClassName={ styles.linkActive }
            to="/docs/setup/"
          >
            { "Setup" }
          </Link>
          <Link
            className={ styles.link }
            activeClassName={ styles.linkActive }
            to="/docs/usage/"
          >
            { "Usage" }
          </Link>
          <Link
            className={ styles.link }
            activeClassName={ styles.linkActive }
            to="/docs/faq/"
          >
            { "FAQ" }
          </Link>
          <a
            className={ styles.link }
            href={ "https://gitter.im/MoOx/phenomic" }
          >
            { "Support 💬" }
          </a>
        </nav>
        <div className={ styles.social }>
          <a
            target="_blank" className="mx-SocialButton"
            href="https://github.com/MoOx/phenomic"
          >
            <span className={ "mx-SocialButton-icon" } >
              <Svg
                svg={ starSvg }
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
            href="https://twitter.com/Phenomic_app"
          >
            <span className={ "mx-SocialButton-icon" } >
              <Svg
                svg={ twitterSvg }
                width={ "1rem" }
                fill={ "#55acee" }
                cleanup
              />
            </span>
            <span className={ "mx-SocialButton-text" }>
              { "Follow @Phenomic_app" }
            </span>
          </a>
        </div>
        <a
          className={ cx(styles.link, styles.version) }
          href={
            "https://github.com/MoOx/phenomic/blob/master/CHANGELOG.md"
          }
        >
          { `v${ npmPkg.version }` }
        </a>
      </header>
    )
  }
}
