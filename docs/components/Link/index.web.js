import React from "react";
import { StyleSheet } from "react-primitives";
import { Link as RouterLink } from "react-router";

const Link = (props: Object) => {
  const injectedProps = {
    style: props.style,
    className: props.className || "",
    activeStyle: props.activeStyle,
    activeClassName: props.activeClassName || ""
  };
  if (typeof injectedProps.style === "number") {
    injectedProps.className +=
      " " + StyleSheet.resolve(injectedProps.style).className;
    injectedProps.style = undefined;
  }
  if (typeof activeStyle === "number") {
    injectedProps.activeClassName +=
      " " + StyleSheet.resolve(injectedProps.activeStyle).className;
    injectedProps.activeStyle = undefined;
  }
  return <RouterLink {...props} {...injectedProps} />;
};

export default Link;
