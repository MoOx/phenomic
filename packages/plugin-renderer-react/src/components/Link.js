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

const isSameOrigin = (url: HTMLAnchorElement) =>
  // ignore url not from the same domain
  // @todo handle sub-folder, see
  // https://github.com/phenomic/phenomic/issues/1124
  origin(url) === origin(window.location);

const shouldIgnoreEvent = (event: SyntheticEvent<HTMLAnchorElement>) =>
  // If target prop is set (e.g. to "_blank"), let browser handle link.
  event.currentTarget.target ||
  event.defaultPrevented ||
  // modifier pressed
  (event.metaKey || event.altKey || event.ctrlKey || event.shiftKey || false);

const goToUrl = (event: SyntheticEvent<HTMLAnchorElement>) => {
  if (isSameOrigin(event.currentTarget)) {
    event.preventDefault();
    // extract to get only interesting parts
    const { pathname, search, hash } = event.currentTarget;
    browserHistory.push({ pathname, search, hash });
  }
};

export const handleEvent = (
  props?: Object,
  test?: (event: SyntheticEvent<HTMLAnchorElement>, props?: Object) => boolean
) => (
  event:
    | SyntheticMouseEvent<HTMLAnchorElement>
    | SyntheticKeyboardEvent<HTMLAnchorElement>
) => {
  props && props.onPress && props.onPress(event);
  props && props.onClick && props.onClick(event);
  !shouldIgnoreEvent(event) &&
    (test ? test(event, props) : true) &&
    goToUrl(event);
};

export const handleClick = (props?: Object) =>
  handleEvent(
    props,
    // $FlowFixMe left click
    (event: SyntheticMouseEvent<HTMLAnchorElement>) => event.button === 0
  );

export const handleKeyDown = (props?: Object) =>
  handleEvent(
    props,
    // $FlowFixMe  enter key
    (event: SyntheticKeyboardEvent<HTMLAnchorElement>) => event.keyCode === 13
  );

export const isActive = (url: string, { router }: Object) => {
  let urlObj = { pathname: url };
  // trick to normalize url when possible, by the browser
  // (eg: relative links are "resolved")
  if (typeof document !== "undefined") {
    const link = document.createElement("a");
    link.href = url;
    if (isSameOrigin(link)) {
      urlObj = { pathname: link.pathname };
      // now 'urlObj' is absolute
    }
  }

  return router && router.isActive && router.isActive(urlObj);
};

function Link(props: PropsType, context: Object) {
  const {
    to,
    href,
    style,
    activeStyle,
    className,
    activeClassName,
    ...otherProps
  } = props;
  const url = to || href || "";

  const isUrlActive = isActive(url, context);
  const computedClassName = cx(className, isUrlActive && activeClassName);
  const computedStyle = {
    ...style,
    ...(isUrlActive ? activeStyle : {})
  };
  return (
    <a
      {...otherProps}
      href={url}
      onClick={handleClick(props)}
      onKeyDown={handleKeyDown(props)}
      // weird syntax to avoid undefined/empty object/strings
      // for now, it's falling back to normal links
      {...(Object.keys(computedStyle).length ? { style: computedStyle } : {})}
      {...(computedClassName ? { className: computedClassName } : {})}
    />
  );
}

Link.contextTypes = {
  router: PropTypes.object.isRequired
};

Link.displayName = "Link";

export default Link;
