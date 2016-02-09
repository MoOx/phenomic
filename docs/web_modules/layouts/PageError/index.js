import React, { Component } from "react"
import { PropTypes } from "react"

export default class PageError extends Component {

  static propTypes = {
    error: PropTypes.number.isRequired,
    errorText: PropTypes.string.isRequired,
  };

  render() {
    const {
      error,
      errorText,
    } = this.props

    return (
      <div>
        <h1>{ error }</h1>
        <p>{ errorText }</p>
      </div>
    )
  }
}
