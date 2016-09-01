import React, { Component, PropTypes } from "react"

import styles from "./index.css"

export default class Container extends Component {

  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  };

  render() {
    return (
      <div className={ styles.container }>
        { this.props.children }
      </div>
    )
  }
}
