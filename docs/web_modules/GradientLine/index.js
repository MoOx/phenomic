import React, { Component, PropTypes } from "react"
import cx from "classnames"

import styles from "./index.css"

class GradientLine extends Component {

  static propTypes = {
    reverse: PropTypes.bool,
    height: PropTypes.number,
  };

  render() {
    const { props } = this
    return (
      <div
        className={ cx({
          [styles.normal]: !props.reverse,
          [styles.reverse]: props.reverse,
        }) }
        style={ {
          height: props.height + "px",
        } }
      />
    )
  }
}

GradientLine.defaultProps = {
  reverse: false,
  height: 4,
}

export default GradientLine
