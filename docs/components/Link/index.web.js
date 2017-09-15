import * as React from "react";
import { StyleSheet, Text } from "react-native-web";
// eslint-disable-next-line
import PropTypes from "prop-types";
// eslint-disable-next-line
import {
  isActive,
  handlePress,
  handleKeyDown
} from "@phenomic/plugin-renderer-react/lib/components/Link.js";

type PropsType = {
  style?: any,
  activeStyle?: any,
  href: string
};

const Link = (
  { style, activeStyle, href, ...props }: PropsType,
  context: Object
) => (
  <Text
    accessibilityRole="link"
    {...props}
    style={[styles.link, style, isActive(href, context) && activeStyle]}
    href={href}
    onPress={handlePress(href, props)}
    onKeyDown={handleKeyDown(href, props)}
  />
);

Link.contextTypes = {
  router: PropTypes.object.isRequired
};

const styles = StyleSheet.create({
  link: {
    // a la react-native
    display: "flex",
    position: "relative"
  }
});

export default Link;
