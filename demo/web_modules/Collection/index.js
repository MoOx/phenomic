import React, { Component } from "react"
import { PropTypes } from "react"

import Page from "Page"

import { connect } from "react-redux"
import enhanceCollection from "statinamic/lib/enhance-collection"

export default
@connect(
  ({ collection }) => {
    return { collection }
  }
)
class Collection extends Component {

  static propTypes = {
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
    collection: PropTypes.array,
  }

  render() {
    const {
      collection,
    } = this.props
    return (
      <div>
        <Page { ...this.props } />
        {
          Boolean(!collection || !collection.length) &&
          <div>
            No entry
          </div>
        }
        {
          Boolean(collection && collection.length) &&
          <div>
            { "Posts (by date)" }
            <ul>
            {
              enhanceCollection(collection, {
                filter: { layout: "Post" },
                sort: "date",
                reverse: true,
                // limit: 1,
              })
              .map((item) => {
                return (
                  <li key={ item.__url }>
                    <a href={ item.__url }>
                      { item.title }
                    </a>
                  </li>
                )
              })
            }
            </ul>

            { "Other pages" }
            <ul>
            {
              enhanceCollection(collection, {
                filter: ({ layout }) => layout !== "Post",
                sort: "title",
              })
              .map((item) => {
                return (
                  <li key={ item.__url }>
                    <a href={ item.__url }>
                      { item.title }
                    </a>
                  </li>
                )
              })
            }
            </ul>
          </div>
        }
      </div>
    )
  }
}
