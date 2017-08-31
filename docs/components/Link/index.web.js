import React from "react";
// https://github.com/lelandrichardson/react-primitives/issues/72
import { StyleSheet } from "react-primitives";
import StyleSheetRegistry from "react-native-web/dist/apis/StyleSheet/registry.js"; // eslint-disable-line
import { Link as RouterLink } from "react-router";

const Link = (props: Object) => {
  const injectedProps = resolve(props.className, [props.style, styles.link]);
  const activeInjectedProps = resolve(props.activeClassName, props.activeStyle);
  return (
    <RouterLink
      {...props}
      {...injectedProps}
      activeStyle={activeInjectedProps.style}
      activeClassName={activeInjectedProps.className}
    />
  );
};

const resolve = (className, style) => {
  if (Array.isArray(style)) {
    const res = style.map(s => resolve(className, s));
    return {
      className:
        (className ? className + " " : "") +
        res.map(r => r.className).filter(x => x).join(" "),
      style: res.reduce((acc, r) => ({ ...acc, ...r.style }), {})
    };
  }
  if (typeof style === "number") {
    return {
      className:
        (className ? className + " " : "") +
        StyleSheetRegistry.resolve(style).className,
      style: {}
    };
  }
  return { style };
};

const styles = StyleSheet.create({
  link: {
    // a la react-native
    display: "flex",
    position: "relative"
  }
});

export default Link;
