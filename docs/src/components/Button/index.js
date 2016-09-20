import React, { PropTypes } from "react"
import cx from "classnames"

import styles from "./index.css"

const Button = ({ className, light, vivid, huge, ...otherProps }) => (
  <span
    role="button"
    { ...otherProps }
    className={ cx({
      [className]: true,
      [styles.button]: true,
      [styles.light]: light,
      [styles.vivid]: vivid,
      [styles.huge]: huge,
    }) }
  />
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
