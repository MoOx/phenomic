import React from "react"
import { Link } from "phenomic"
import Color from "color"
import Svg from "react-svg-inline"

import GradientLine from "../GradientLine"
import DocSearch from "../DocSearch"
import npmPkg from "../../../../package.json"
import phenomicLogoSvg from "../../../../logo/phenomic.svg"

import styles from "./index.css"
import chatSvg from "./chat.svg"
import twitterSvg from "./twitter.svg"
import githubSvg from "./github.svg"

const blue = Color("#006DF4")
const green = Color("#0FE358")
const totalLink = 7 + 1 // + 1 to avoid the real green, too light

const Header = () => {
  let i = 1
  return (
    <header className={ styles.header }>
      <nav className={ styles.nav }>
        <div className={ styles.navPart }>
          <div className={ styles.logo }>
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
          <div className={ styles.navSubPart }>
            <Link
              style={{
                color:
                green.clone().mix(blue, (i++ - 1) / totalLink).rgbString(),
              }}
              className={ styles.link }
              activeClassName={ styles.linkActive }
              to="/docs/setup/"
            >
              { "Setup" }
            </Link>
            <Link
              style={{
                color:
                green.clone().mix(blue, (i++ - 1) / totalLink).rgbString(),
              }}
              className={ styles.link }
              activeClassName={ styles.linkActive }
              to="/docs/getting-started/"
            >
              { "Getting Started" }
            </Link>
            <Link
              style={{
                color:
                green.clone().mix(blue, (i++ - 1) / totalLink).rgbString(),
              }}
              className={ styles.link }
              activeClassName={ styles.linkActive }
              to="/docs/usage/"
            >
              { "Usage" }
            </Link>
            <Link
              style={{
                color:
                green.clone().mix(blue, (i++ - 1) / totalLink).rgbString(),
              }}
              className={ styles.link }
              activeClassName={ styles.linkActive }
              to="/docs/faq/"
            >
              { "FAQ" }
            </Link>
          </div>
        </div>
        <div className={ styles.navPart }>
          <div className={ styles.navSubPart }>
            <DocSearch />
          </div>
          <div className={ styles.navSubPart }>
            <Link
              style={{
                color:
                green.clone().mix(blue, (i++ - 1) / totalLink).rgbString(),
              }}
              className={ styles.link }
              activeClassName={ styles.linkActive }
              to="/showcase/"
            >
              <strong>{ "Showcase" }</strong>
            </Link>
            <a
              style={{
                color:
                  green.clone().mix(blue, (i++ - 1) / totalLink).rgbString(),
              }}
              className={ styles.link }
              title="Chat"
              href="https://gitter.im/MoOx/phenomic"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Svg
                className={ styles.linkIcon }
                svg={ chatSvg }
                width={ "2rem" }
                fill={ "currentColor" }
                cleanup
              />
            </a>
            <a
              style={{
                color:
                  green.clone().mix(blue, (i++ - 1) / totalLink).rgbString(),
              }}
              className={ styles.link }
              title="GitHub"
              href="https://github.com/MoOx/phenomic"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Svg
                className={ styles.linkIcon }
                svg={ githubSvg }
                width="2rem"
                fill="currentColor"
                cleanup
              />
            </a>
            <a
              style={{
                color:
                  green.clone().mix(blue, (i++ - 1) / totalLink).rgbString(),
              }}
              className={ styles.link }
              title="Twitter"
              href="https://twitter.com/Phenomic_app"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Svg
                className={ styles.linkIcon }
                svg={ twitterSvg }
                width="2rem"
                fill="currentColor"
                cleanup
              />
            </a>
          </div>
        </div>
      </nav>
      <GradientLine height={ 1 } />
    </header>
  )
}

export default Header
