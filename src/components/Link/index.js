// @flow
import React, { PropTypes } from "react"
import cx from "classnames"
import { Link as RouterLink } from "react-router"

const origin = (location) => (
  location.origin ||

  // IE does not correctly handle origin, maybe Edge does...
  (
    location.protocol + "//" +
    location.hostname +
    (location.port ? ":" + location.port: "")
  )
)

function Link(
  props: {
    className: string,
    activeClassName: string,
    to: string,
    children: any,
  },
  { router }: { router: Object }
): React$Element<any> {
  const { to, ...otherProps } = props

  const simpleLink = (
    <a
      { ...otherProps }
      href={ to }
      className={ props.className }
    />
  )

  // static rendering
  if (typeof document === "undefined") {
    return simpleLink
  }

  const link = document.createElement("a")
  link.href = to

  if (
    origin(link) === origin(window.location) &&
    link.pathname.indexOf(process.env.PHENOMIC_USER_PATHNAME) > -1
  ) {
    return (
      <RouterLink
        { ...otherProps }
        to={ to }
        className={ cx(props.className, {
          [props.activeClassName]: (router && (
            router.isActive({ pathname: props.to }) ||
            router.isActive({ pathname: props.to + "index.html" })
          )) && props.activeClassName,
        }) }
      />
    )
  }

  return simpleLink
}

Link.propTypes = {
  children: PropTypes.node,
  to: PropTypes.string.isRequired,
  className: PropTypes.string,
  activeClassName: PropTypes.string,
}

Link.contextTypes = {
  router: PropTypes.object.isRequired,
}

Link.displayName = "Link"

export default Link
