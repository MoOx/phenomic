// @flow
import React, { PropTypes } from "react"
import cx from "classnames"

import { Link as RouterLink } from "react-router"

export function Link(
  props: {
    className: string,
    activeClassName: string,
    to: string,
    children: any,
  },
  { router }: { router: Object }
): React$Element {
  return (
    <RouterLink
      { ...props }
      className={ cx(props.className, {
        [props.activeClassName]: (router && (
          router.isActive({ pathname: props.to }) ||
          router.isActive({ pathname: props.to + "index.html" })
        )) && props.activeClassName,
      }) }
    >
      { props.children }
    </RouterLink>
  )
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

/*
  exported as default and Link so people can easily switch their
  import { Link } from "react-router"
  to
  import { Link } from "phenomic/lib/Link"
  or
  import Link from "phenomic/lib/Link"
*/
export default Link
