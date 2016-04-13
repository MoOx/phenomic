import React, { Component } from "react"
import Link from "phenomic/lib/Link"

import Button from "../../Button"
import Page from "../Page"

// import styles from "./index.css"

export default class Homepage extends Component {

  render() {
    return (
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
            <Button huge>
              { "Try it now" }
            </Button>
          </Link>
        </p>
      </Page>
    )
  }
}
