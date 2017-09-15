import * as React from "react";
import { Text, TouchableOpacity } from "react-native-web";
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
  <TouchableOpacity>
    <Text
      accessibilityRole="link"
      {...props}
      style={[style, isActive(href, context) && activeStyle]}
      href={href}
      onPress={handlePress(href, props)}
      onKeyDown={handleKeyDown(href, props)}
    />
  </TouchableOpacity>
);

Link.contextTypes = {
  router: PropTypes.object.isRequired
};

export default Link;
