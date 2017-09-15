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
  to: string
};

const Link = (
  { style, activeStyle, to, ...props }: PropsType,
  context: Object
) => (
  <Text
    accessibilityRole="link"
    {...props}
    style={[styles.link, style, isActive(to, context) && activeStyle]}
    href={to}
    onPress={handlePress(to, props)}
    onKeyDown={handleKeyDown(to, props)}
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
