import React from "react"
import { Link } from "phenomic"

import Banner from "../Banner"

import styles from "./index.css"

const Footer = () => (
  <footer className={ styles.footer }>
    <Banner tiny>
      <a
        className={ styles.link }
        href="http://moox.io/"
      >
        { "Cooked by " }
        <span className={ styles.reference }>
          {  "@MoOx" }
        </span>
      </a>
      <span className={ styles.separator }>{ " | " }</span>
      <iframe
        allowTransparency="true"
        frameBorder="0"
        scrolling="0"
        style={{
          width: "155px",
          height: "30px",
          verticalAlign: "middle",
        }}
        src={
          "https://ghbtns.com/github-btn.html?" +
          "user=MoOx&repo=phenomic&type=star&count=true&size=large"
        }
      />
      <iframe
        allowTransparency="true"
        frameBorder="0"
        scrolling="no"
        style={{
          width: "275px",
          height: "30px",
          verticalAlign: "middle",
        }}
        src={
          "https://platform.twitter.com/widgets/follow_button.html?" +
          "screen_name=Phenomic_app&count=horizontal&size=l"
        }
      />
      <span className={ styles.separator }>{ " | " }</span>
      { "Pages: " }
      <Link
        className={ styles.link }
        to="/404.html"
      >
        { "404" }
      </Link>
    </Banner>
  </footer>
)

export default Footer
