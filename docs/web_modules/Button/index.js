import React, { PropTypes } from "react"
import cx from "classnames"

import styles from "./index.css"

const Button = (props) => (
  <div
    role="button"
    { ...props }
    className={ cx({
      [props.className]: true,
      [styles.button]: true,
      [styles.light]: props.light,
      [styles.vivid]: props.vivid,
      [styles.huge]: props.huge,
    }) }
  >
    { props.children }
  </div>
)

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  huge: PropTypes.bool,
  light: PropTypes.bool,
  vivid: PropTypes.bool,
}

Button.displayName = "Button"

export default Button
