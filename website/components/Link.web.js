// @flow

import * as React from "react";
import { StyleSheet, View, Text } from "react-native-web";
// eslint-disable-next-line
import PropTypes from "prop-types";

// eslint-disable-next-line
import {
  isActive,
  handleEvent,
} from "@phenomic/plugin-renderer-react/lib/components/Link.js";

import Stylable from "./react-stylable";

const BASENAME = process.env.PHENOMIC_APP_BASENAME || "/";

type PropsType = {|
  style?: any,
  activeStyle?: any,
  href: string,
|};

const Link = (
  { style, activeStyle, href, ...props }: PropsType,
  context: Object,
) => {
  return (
    <Text
      {...props}
      accessibilityRole="link"
      style={[style, isActive(href, context) && activeStyle]}
      href={
        href.indexOf("://") > -1
          ? href
          : href.charAt(0) === "/"
            ? BASENAME + href.slice(1)
            : href
      }
      onPress={handleEvent(props, context.router)}
    />
  );
};

Link.contextTypes = {
  router: PropTypes.object.isRequired,
};

// @todo using TouchableOpacity make the external links unusable with keyboard
// https://github.com/necolas/react-native-web/issues/643

/* eslint-disable */
Link.Block = ({ blockProps = {}, ...props }: PropsType) => (
  <View style={[blockProps.style, { flexGrow: 1 }]}>
    <Stylable
      accessible={false}
      style={[styles.touchable, props.style, { display: "flex" }]}
      hoveredOrFocusedStyle={styles.hoveredOrFocused}
      touchedStyle={styles.touchabled}
    >
      <Link {...props} />
    </Stylable>
  </View>
);

Link.Touchable = (props: PropsType) => (
  <Stylable
    accessible={false}
    style={[styles.touchable, props.style]}
    hoveredOrFocusedStyle={styles.hoveredOrFocused}
    touchedStyle={styles.touchabled}
  >
    <Link {...props} />
  </Stylable>
);
/* eslint-enable */

export default Link;

const styles = StyleSheet.create({
  touchable: {
    transitionDuration: "0.1s",
    transitionProperty: "opacity",
  },
  hoveredOrFocused: {
    opacity: 0.8,
  },
  touchabled: {
    opacity: 0.6,
  },
});
