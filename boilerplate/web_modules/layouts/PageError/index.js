import React, { Component, PropTypes } from "react"

export default class PageError extends Component {

  static propTypes = {
    error:
      PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]).isRequired,
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
