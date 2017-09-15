// @flow
import * as React from "react";
import PropTypes from "prop-types";
import cx from "classnames";
import { browserHistory } from "react-router";

const origin = url =>
  typeof url === "object" &&
  // jsdom can return "null" string...
  ((url.origin !== "null" && url.origin) ||
    // // IE does not correctly handle origin, maybe Edge does...
    url.protocol + "//" + url.hostname + (url.port ? ":" + url.port : ""));

type PropsType = {
  style?: Object,
  activeStyle?: Object,
  className?: string,
  activeClassName?: string,
  to?: string,
  href?: string,
  children?: React.Node
};

const shouldIgnoreEvent = (event: SyntheticEvent<*>) =>
  // If target prop is set (e.g. to "_blank"), let browser handle link.
  event.currentTarget.target ||
  event.defaultPrevented ||
  // modifier pressed
  (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || false);

const goToUrl = (event: SyntheticEvent<*>, url: string) => {
  event.preventDefault();
  browserHistory.push(url);
};

export const isActive = (url: string, { router }: Object) =>
  router &&
  router.isActive &&
  (router.isActive({ pathname: url }) ||
    router.isActive({ pathname: url + "index.html" }));

export const handlePress = (url: string, props?: Object) => (
  event: SyntheticMouseEvent<HTMLElement>
) => {
  props && props.onClick && props.onClick(event);
  !shouldIgnoreEvent(event) &&
    // left click
    event.button === 0 &&
    goToUrl(event, url);
};

export const handleKeyDown = (url: string, props?: Object) => (
  event: SyntheticKeyboardEvent<HTMLElement>
) => {
  props && props.onKeyDown && props.onKeyDown(event);
  !shouldIgnoreEvent(event) &&
    // enter key
    event.keyCode === 13 &&
    goToUrl(event, url);
};

function Link(props: PropsType, context: Object) {
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

  const isLocal =
    // jsdom have url data directly into "url" property, so just in case
    // it's like that on some browsers...
    origin(toLink) === origin(window.location);
  // we might want to restrict Link to path including the pathname
  // but this will require to preprend pathname to all Links from the
  // path, which sucks.
  // If people wants to use Link for a same domain, but in the parent path,
  // you will need to includes the entire url, / won't work at it will use
  // the react-router basename defined by Phenomic.
  // &&
  // toLink.pathname.includes(process.env.PHENOMIC_USER_PATHNAME)
  // toLink.pathname.indexOf(process.env.PHENOMIC_USER_PATHNAME) > -1
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

  if (!isLocal) {
    return simpleLink;
  }

  const isUrlActive = isActive(url, context);
  const className = cx(props.className, isUrlActive && props.activeClassName);

  return (
    <a
      {...otherProps}
      href={toLink.href}
      onClick={handlePress(toLink.href, props)}
      onKeyDown={handleKeyDown(toLink.href, props)}
      // @todo handle onKeyPress for keyboard navigation
      // for now, it's falling back to normal links
      style={{
        ...props.style,
        ...(isActive && props.activeStyle)
      }}
      // weird syntax to avoid undefined/empty classname
      {...(className ? { className } : {})}
    />
  );
}

Link.contextTypes = {
  router: PropTypes.object.isRequired
};

Link.displayName = "Link";

export default Link;
