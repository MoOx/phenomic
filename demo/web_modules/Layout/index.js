import React, { Component } from "react"
import { PropTypes } from "react"

import { Link } from "react-router"

import styles from "./index.css"
import npmPkg from "../../../package.json"

import ga from "react-google-analytics"
const GoogleAnalyticsInitiailizer = ga.Initializer

const supportUrl = "https://discord.gg/0ZcbPKXt5bW1pAiw"
const supportBadge =
  "https://img.shields.io/badge/support-reactiflux%23statinamic-738bd7.svg"
const changelogUrl =
  "https://github.com/MoOx/statinamic/blob/master/CHANGELOG.md"

export default class Layout extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
    params: PropTypes.object,
  }

  static contextTypes = {
    pkg: PropTypes.object.isRequired,
  }

  componentWillMount() {
    const { pkg } = this.context
    if (__PROD__) {
      ga("create", pkg.googleAnalyticsUA, "auto")
    }
    if (__DEV__) {
      console.info("ga.create", pkg.googleAnalyticsUA)
    }
    this.logPageview()
  }

  componentWillReceiveProps(props) {
    if (props.params.splat !== this.props.params.splat) {
      this.logPageview()
    }
  }

  logPageview() {
    if (__PROD__) {
      ga("send", "pageview")
    }
    if (__DEV__ && typeof window !== "undefined") {
      console.info("New pageview", window.location.href)
    }
  }

  render() {
    const separator = <span className={ styles.separator }>{ " | " }</span>

    return (
      <div className={ styles.wrapper }>
        <nav className={ styles.nav }>
          <Link
            className={ styles.link }
            to="/statinamic/"
          >
            { "Home" }
          </Link>
          { separator }
          <Link
            className={ styles.link }
            to="/statinamic/docs/setup/"
          >
            { "Setup" }
          </Link>
          { separator }
          <Link
            className={ styles.link }
            to="/statinamic/docs/usage/"
          >
            { "Usage" }
          </Link>
          { separator }
          <Link
            className={ styles.link }
            to="/statinamic/docs/faq/"
          >
            { "FAQ" }
          </Link>
          { separator }
          <a
            className={ styles.link }
            href="https://github.com/MoOx/statinamic"
          >
            { "GitHub" }
          </a>
          { separator }
          <a
            className={ styles.link }
            href="https://twitter.com/MoOx"
          >
            { "Twitter" }
          </a>
          { separator }
          <a
            className={ styles.link }
            href={ supportUrl }
          >
            <img
              className={ styles.icon }
              src={ supportBadge }
              alt={ "Support on reactiflux#statinamic" }
            />
          </a>
          { separator }
          <a
            className={ styles.version }
            href={ changelogUrl }
          >
            { `v${ npmPkg.version }` }
          </a>
        </nav>
        { this.props.children }
        <footer className={ styles.footer }>
          { "© 2015 - " }
          <a href="http://moox.io/">{ "@MoOx" }</a>
          { "  |  " }
          <a href="https://github.com/MoOx/statinamic">
            { "Check out on GitHub" }
          </a>
        </footer>
        <GoogleAnalyticsInitiailizer />
      </div>
    )
  }
}
