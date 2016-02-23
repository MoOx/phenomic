import React, { PropTypes } from "react"
import cx from "classnames"

import styles from "./index.css"

const Button = (props) => (
  <button
    role="button"
    { ...props }
    className={ cx({
      [props.className]: true,
      [styles.button]: true,
      [styles.huge]: props.huge,
    }) }
  >
    { props.children }
  </button>
)

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  huge: PropTypes.bool,
}

Button.displayName = "Button"

export default Button
