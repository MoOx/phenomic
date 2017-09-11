// @flow
import * as React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { Link as RouterLink } from "react-router";

const origin = url =>
  typeof url === "object" &&
  // jsdom can return "null" string...
  ((url.origin !== "null" && url.origin) ||
    // // IE does not correctly handle origin, maybe Edge does...
    url.protocol + "//" + url.hostname + (url.port ? ":" + url.port : ""));

type PropsType = {
  className?: string,
  activeClassName?: string,
  to?: string,
  href?: string,
  children?: React.Node
};

function Link(props: PropsType, { router }: { router: Object }) {
  // eslint-disable-next-line no-unused-vars
  const { to, href, ...otherProps } = props;
  const url = props.to || props.href || "";

  const simpleLink = <a {...otherProps} href={url} />;

  // static rendering
  if (typeof document === "undefined") {
    return simpleLink;
  }

  const toLink = document.createElement("a");
  toLink.href = url;

  // @todo handle properly use base only
  // in v0.x we were relying on the base url
  // if (
  //   // parent absolute url with the same domain
  //   // should not be Link
  //   url.indexOf("://") > -1 //&&
  //   url.indexOf(process.env.PHENOMIC_USER_URL) === -1
  // ) {
  //   return simpleLink;
  // }

  if (
    // jsdom have url data directly into "url" property, so just in case
    // it's like that on some browsers...
    origin(toLink) === origin(window.location)
    // we might want to restrict Link to path including the pathname
    // but this will require to preprend pathname to all Links from the
    // path, which sucks.
    // If people wants to use Link for a same domain, but in the parent path,
    // you will need to includes the entire url, / won't work at it will use
    // the react-router basename defined by Phenomic.
    // &&
    // toLink.pathname.includes(process.env.PHENOMIC_USER_PATHNAME)
    // toLink.pathname.indexOf(process.env.PHENOMIC_USER_PATHNAME) > -1
  ) {
    const className = cx(props.className, {
      [props.activeClassName || ""]:
        router &&
        (router.isActive({ pathname: url }) ||
          router.isActive({ pathname: url + "index.html" })) &&
        Boolean(props.activeClassName)
    });
    return (
      <RouterLink
        {...otherProps}
        // react-router seems to be pretty dumb with relative links...
        // this way we have a proper link
        to={toLink.href}
        {...(className ? { className } : {})}
      />
    );
  }

  return simpleLink;
}

Link.contextTypes = {
  router: PropTypes.object.isRequired
};

Link.displayName = "Link";

export default Link;
