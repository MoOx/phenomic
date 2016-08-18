import React, { PropTypes } from "react"
import { Link } from "phenomic/lib/Link"
import enhanceCollection from "phenomic/lib/enhance-collection"

import urlToSlug from "../url-to-slug"

import Page from "../layouts/Page"

import styles from "./index.css"

const Showcase = (props, context) => {
  const currentTag = props.params && props.params.showcaseTag || false

  let phenomicDocs
  const currentList = enhanceCollection(context.collection, {
    // filter: { showcaseTags: currentTags }
    filter: currentTag
      ? (item) => (
        Boolean(item.showcaseTags && item.showcaseTags.indexOf(currentTag) > -1)
      )
      : (item) => Boolean(item.showcaseTags),
    sort: (a, b) => (
      // more tags first
      a.showcaseTags.length < b.showcaseTags.length ||
      // blog last
      a.showcaseTags.indexOf("blog") > -1
    ),
  })
  // place Phenomic itself at the end
  .filter((item) => {
    if (item.title !== "Phenomic docs") {
      return true
    }
    phenomicDocs = item
    return false
  })
  if (phenomicDocs) {
    currentList.push(phenomicDocs)
  }

  const addYourOwn = (
    <p className={ styles.addYourOwn }>
      <Link
        to={ "/showcase/submit/" }
        className={ styles.editPage }
      >
        {
          "Add your own website to this page!"
        }
      </Link>
    </p>
  )

  return (
    <div style={ { textAlign: "center" } }>
      <Page
        head={ {
          title: "See who's using Phenomic",
        } }
        __filename={ "../web_modules/Showcase/index.js" }
        __url={ "/showcase/" }
      >
        { addYourOwn }
        {
          currentTag &&
          <div>
            <span className={ styles.filterMessage }>
              { "You are currently viewing projects that match " }
              <em>{ currentTag }</em>
              { " tag. " }
              <Link
                to={ "/showcase/" }
                className={ styles.filterMessageLink }
              >
                { "View all." }
              </Link>
            </span>
          </div>
        }
        <ul
          className={ styles.list }
        >
          {
            currentList.map((item) => {
              return (
                <li
                  key={ item.title }
                  className={ styles.item }
                >
                  <a
                    className={ styles.itemLink }
                    href={ item.url }
                  >
                    { item.title }
                  </a>
                  <ul className={ styles.itemTags }>
                    {
                      item.showcaseTags &&
                      item.showcaseTags.map((tag) => (
                        <li
                          key={ tag }
                          className={ styles.itemTag }
                        >
                          <Link
                            to={ "/showcase/tag/" + tag }
                            className={ styles.itemTagLink }
                          >
                            { tag }
                          </Link>
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
  params: PropTypes.object,
}

Showcase.contextTypes = {
  collection: PropTypes.array.isRequired,
}

export default Showcase
