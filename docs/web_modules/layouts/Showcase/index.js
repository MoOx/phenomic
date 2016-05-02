import React, { PropTypes } from "react"
import invariant from "invariant"

import Page from "../Page"
import EditThisPage from "../../EditThisPage"

import styles from "./index.css"

const Showcase = (props) => {

  invariant(
    props.head && props.head.list,
    "Showcase page need a list"
  )

  return (
    <div style={ { textAlign: "center" } }>
      <Page { ...props}>
        <ul
          className={ styles.list }
        >
          {
            props.head && props.head.list &&
            props.head.list.map((item) => {
              return (
                <li
                  key={ item.name }
                  className={ styles.item }
                >
                  <a
                    className={ styles.itemLink }
                    href={ item.url }
                  >
                    { item.name }
                  </a>
                  <br />
                  {
                    item.source &&
                    <a
                      className={ styles.itemLinkSource }
                      href={ item.source }
                    >
                      { "(source)" }
                    </a>
                  }
                </li>
              )
            })
          }
        </ul>
        <p style={ { marginTop: "4rem" } }>
          {
            "To add your own, you just need to "
          }
          <EditThisPage filename={ props.__filename } />
        </p>
      </Page>
    </div>
  )
}

Showcase.propTypes = {
  __filename: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired,
}

export default Showcase
