import React, { PropTypes } from "react"
import cx from "classnames"

import styles from "./index.css"

const Button = (props) => {
  const { className, light, vivid, huge, ...otherProps } = props
  return (
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
    >
      { props.children }
    </span>
  )
}

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  huge: PropTypes.bool,
  light: PropTypes.bool,
  vivid: PropTypes.bool,
}

Button.displayName = "Button"

export default Button
