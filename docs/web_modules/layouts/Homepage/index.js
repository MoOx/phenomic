import React, { Component } from "react"
import Link from "phenomic/lib/Link"

// sketch svg export is too bugy :/
// import Svg from "react-svg-inline"
// import phenomicLogoSvg from "../../../../logo/phenomic-logo-white.svg"
import phenomicLogo from "../../../../logo/phenomic-logo-white.png"

import Button from "../../Button"
import Banner from "../../Banner"
// import Content from "../../Content"

import Page from "../Page"

import styles from "./index.css"

export default class Homepage extends Component {

  render() {
    return (
      <div>
        <Banner big>
          <div style={ { textAlign: "center" } }>
            <img
              src={ phenomicLogo }
            />
            {/* <Svg
              svg={ phenomicLogoSvg }
              width="100%" height="auto"
              cleanup
            /> */}
            <h1 className={ styles.title }>
              { "Phenomic is a modern " }
              <strong className={ styles.bold }>
              { "website generator " }
              </strong>
              <br />
              { "based on the React and Webpack ecosystem." }
            </h1>
            <h2>
              { "You can use it to build static" }
              <sup>{ "*" }</sup>
              { " websites." }
            </h2>
            <Link
              to={ "/docs/setup/" }
              style={ {
                display: "inline-flex",
                textDecoration: "none",
                boxShadow: "none",
                background: "none",
              } }
            >
              <Button huge light>
                { "Try it now" }
              </Button>
            </Link>
            <p style={ { marginTop: "3rem", fontSize: "0.8rem" } }>
              { "* All pages are available as HTML (works with no JavaScript)" }
              { " but user can get an enhanced navigation (when JavaScript is" }
              { " on)." }
              <br />
              { " Phenomic provides a dynamic UX similar to apps. " }
              { " Try to navigate in this website to see it by yourself. " }
            </p>
            <br />
            <iframe
              allowTransparency="true"
              frameBorder="0"
              scrolling="0"
              style={ {
                width: "135px",
                height: "30px",
                verticalAlign: "middle",
              } }
              src={
                "https://ghbtns.com/github-btn.html?" +
                "user=MoOx&repo=phenomic&type=star&count=true&size=large"
              }
            ></iframe>
          </div>
        </Banner>
        <Page { ...this.props} >
          <p
            style={ {
              display: "block",
              textAlign: "center",
              margin: "2rem 0",
              boxShadow: "none",
              background: "none !important",
            } }
          >
            <Link
              to={ "/docs/setup/" }
              style={ {
                display: "inline-flex",
                textDecoration: "none",
                boxShadow: "none",
              } }
            >
              <Button huge vivid>
                { "Try it now" }
              </Button>
            </Link>
          </p>
        </Page>
      </div>
    )
  }
}
