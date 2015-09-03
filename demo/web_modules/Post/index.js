import React, { Component } from "react"
import { PropTypes } from "react"

import Page from "Page"

export default class Post extends Component {

  static propTypes = {
    head: PropTypes.object.isRequired,
    body: PropTypes.string.isRequired,
  }

  render() {
    return (
      <div>
        { "Post !"}
        <Page { ...this.props } />
      </div>
    )
  }
}
