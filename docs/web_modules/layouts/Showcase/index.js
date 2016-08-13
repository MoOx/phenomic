import React, { PropTypes } from "react"
import invariant from "invariant"

import urlToSlug from "../../url-to-slug"

import Page from "../Page"
import EditThisPage from "../../EditThisPage"

import styles from "./index.css"

const Showcase = (props) => {

  invariant(
    props.head && props.head.list,
    "Showcase page need a list"
  )

  const addYourOwn = (
    <p className={ styles.addYourOwn }>
      <EditThisPage
        className={ styles.editPage }
        filename={ props.__filename }
      >
        {
          "Add your own website to this page!"
        }
      </EditThisPage>
    </p>
  )

  return (
    <div style={ { textAlign: "center" } }>
      <Page { ...props }>
        { addYourOwn }
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
                  <ul className={ styles.itemTags }>
                    {
                      item.tags &&
                      item.tags.map((tag) => (
                        <li
                          key={ tag }
                          className={ styles.itemTag }
                        >
                          { tag }
                        </li>
                      ))
                    }
                  </ul>
                  <br />
                  <a
                    href={ item.url }
                  >
                    <img
                      className={ styles.itemScreenshotLarge }
                      src={
                          "/assets/showcases/" +
                          urlToSlug(item.url) + "-large.jpg"
                      }
                    />
                    <img
                      className={ styles.itemScreenshotSmall }
                      src={
                          "/assets/showcases/" +
                          urlToSlug(item.url) + "-small.jpg"
                      }
                    />
                  </a>
                  <br />
                  {
                    item.source &&
                    <a
                      className={ styles.itemLinkSource }
                      href={ item.source }
                    >
                      { "(Source)" }
                    </a>
                  }
                </li>
              )
            })
          }
        </ul>
        { addYourOwn }
      </Page>
    </div>
  )
}

Showcase.propTypes = {
  __filename: PropTypes.string.isRequired,
  head: PropTypes.object.isRequired,
}

export default Showcase
