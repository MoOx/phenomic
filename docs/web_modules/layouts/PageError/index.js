import React, { Component } from "react"
import { PropTypes } from "react"

import styles from "./index.css"

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
      <div className={ styles.container }>
        <div className={ styles.oops }>{ "😱 Oooops!" }</div>
        <div className={ styles.text }>
          <p className={ styles.title }>
            <strong>{ error }</strong>
            { " " }
            { errorText }
          </p>
          {
            error === 404 && [
              "It seems you find a broken link. ",
              "Sorry about that. ",
              <br />,
              "Do not hesitate to report us this page 😁.",
            ]
          }

        </div>
      </div>
    )
  }
}
