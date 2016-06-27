import React, { Component, PropTypes } from "react"
import enhanceCollection from "phenomic/lib/enhance-collection"

import Page from "../Page"
import PagesList from "../../PagesList"

const numberOfLatestPosts = 6

export default class Homepage extends Component {
  static contextTypes = {
    collection: PropTypes.array.isRequired,
  }

  render() {
    const latestPosts = enhanceCollection(this.context.collection, {
      filter: { layout: "Post" },
      sort: "date",
      reverse: true,
    })
    .slice(0, numberOfLatestPosts)

    return (
      <Page { ...this.props }>
        <h2>{ "Latest Posts" }</h2>
        <PagesList pages={ latestPosts } />
      </Page>
    )
  }
}
