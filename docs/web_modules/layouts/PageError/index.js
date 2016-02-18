import React, { Component } from "react"
import { PropTypes } from "react"

export default class PageError extends Component {

  static propTypes = {
    error: PropTypes.number,
    errorText: PropTypes.string,
  };

  static defaultProps = {
    error: 404,
    errorText: "Page Not Found",
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
