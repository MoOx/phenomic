import React, { Component } from "react"
import Link from "phenomic/lib/Link"

import Color from "color"

import Content from "../Content"
import GradientLine from "../GradientLine"

import styles from "./index.css"
import npmPkg from "../../../package.json"
import Svg from "react-svg-inline"
import phenomicLogoSvg from "../../../logo/phenomic.svg"
import chatSvg from "./chat.svg"
import twitterSvg from "./twitter.svg"
import githubSvg from "./github.svg"

const blue = Color("#006DF4")
const green = Color("#0FE358")
const totalLink = 7 + 1 // + 1 to avoid the real green, too light

class Header extends Component {

  render() {
    let i = 1
    return (
      <header className={ styles.header }>
        <Content>
          <nav className={ styles.nav }>
            <div
              className={ styles.logo }
            >
              <Link
                to="/"
                className={ styles.logoLink }
              >
                <Svg
                  svg={ phenomicLogoSvg }
                  width="100%"
                  fill="#fff"
                  cleanup
                />
              </Link>
              <a
                className={ styles.version }
                href={
                  "https://github.com/MoOx/phenomic/blob/master/CHANGELOG.md"
                }
              >
                { npmPkg.version }
              </a>
            </div>
            <div className={ styles.internal }>
            <Link
              style={ {
                color:
                  green.clone().mix(blue, (i++ - 1) / totalLink).rgbString(),
              } }
              className={ styles.link }
              activeClassName={ styles.linkActive }
              to="/docs/setup/"
            >
              { "Setup" }
            </Link>
            <Link
              style={ {
                color:
                  green.clone().mix(blue, (i++ - 1) / totalLink).rgbString(),
              } }
              className={ styles.link }
              activeClassName={ styles.linkActive }
              to="/docs/getting-started/"
            >
              { "Getting Started" }
            </Link>
            <Link
              style={ {
                color:
                  green.clone().mix(blue, (i++ - 1) / totalLink).rgbString(),
              } }
              className={ styles.link }
              activeClassName={ styles.linkActive }
              to="/docs/usage/"
            >
              { "Usage" }
            </Link>
            <Link
              style={ {
                color:
                  green.clone().mix(blue, (i++ - 1) / totalLink).rgbString(),
              } }
              className={ styles.link }
              activeClassName={ styles.linkActive }
              to="/docs/faq/"
            >
              { "FAQ" }
            </Link>
            <Link
              style={ {
                color:
                  green.clone().mix(blue, (i++ - 1) / totalLink).rgbString(),
              } }
              className={ styles.link }
              activeClassName={ styles.linkActive }
              to="/showcase/"
            >
              { " Showcase" }
            </Link>
            </div>
            <div className={ styles.internal }>
              <a
                style={ {
                  color:
                    green.clone().mix(blue, (i++ - 1) / totalLink).rgbString(),
                } }
                className={ styles.link }
                href={ "https://gitter.im/MoOx/phenomic" }
              >
                <Svg
                  className={ styles.linkIcon }
                  svg={ chatSvg }
                  width={ "1rem" }
                  fill={ "currentColor" }
                  cleanup
                />
                { "Chat" }
              </a>
              <a
                style={ {
                  color:
                    green.clone().mix(blue, (i++ - 1) / totalLink).rgbString(),
                } }
                className={ styles.link }
                href="https://github.com/MoOx/phenomic"
                target="_blank"
              >
                <Svg
                  className={ styles.linkIcon }
                  svg={ githubSvg }
                  width={ "1rem" }
                  fill={ "currentColor" }
                  cleanup
                />
                { "GitHub" }
              </a>
              <a
                style={ {
                  color:
                    green.clone().mix(blue, (i++ - 1) / totalLink).rgbString(),
                } }
                className={ styles.link }
                href="https://twitter.com/Phenomic_app"
                target="_blank"
              >
                <Svg
                  className={ styles.linkIcon }
                  svg={ twitterSvg }
                  width={ "1rem" }
                  fill={ "currentColor" }
                  cleanup
                />
                { "Twitter" }
              </a>
            </div>
          </nav>
        </Content>
        <GradientLine height={ 1 } />
      </header>
    )
  }
}

export default Header
