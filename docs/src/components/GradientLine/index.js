import React, { PropTypes } from "react"
import cx from "classnames"

import styles from "./index.css"

const GradientLine = (props) => (
  <div
    className={ cx({
      [styles.normal]: !props.reverse,
      [styles.reverse]: props.reverse,
    }) }
    style={{
      height: props.height + "px",
    }}
  />
)

GradientLine.defaultProps = {
  reverse: false,
  height: 4,
}

GradientLine.propTypes = {
  reverse: PropTypes.bool,
  height: PropTypes.number,
}

export default GradientLine
