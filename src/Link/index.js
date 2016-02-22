import React, { Component, PropTypes } from "react"
import { Link as RouterLink } from "react-router"

export default class Link extends Component {
  static propTypes = {
    children: PropTypes.oneOfType([ PropTypes.string, PropTypes.object ]),
    to: PropTypes.string.isRequired,
    className: PropTypes.string,
    activeClassName: PropTypes.string,
  };

  static contextTypes = {
    router: PropTypes.object.isRequired,
  };

  render() {
    const {
      to,
      children,
      className,
      activeClassName,
    } = this.props

    const { router } = this.context

    let finalClassName = className

    if (router) {
      if (
        router.isActive({ pathname: to }) ||
        router.isActive({ pathname: to + "index.html" })
      ) {
        finalClassName += " " + activeClassName
      }
    }

    return (
      <RouterLink
        to={ to }
        className={ finalClassName }
      >
        { children }
      </RouterLink>
    )
  }
}
