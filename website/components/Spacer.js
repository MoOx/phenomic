import * as React from "react";
import { StyleSheet, View } from "react-native-web";

type props = {|
  horizontal?: boolean,
  vertical?: boolean,
  small?: boolean,
  smallHorizontal?: boolean,
  smallVertical?: boolean,
  large?: boolean,
  largeHorizontal?: boolean,
  largeVertical?: boolean
|};
const Spacer = (props: props) => (
  <View
    style={[
      styles.default,
      !props.horizontal && !props.vertical && styles.normalMargin,
      props.horizontal && styles.normalMarginHorizontal,
      props.vertical && styles.normalMarginVertical,
      props.small && styles.smallMargin,
      props.large && styles.largeMargin,
      props.smallHorizontal && styles.smallMarginHorizontal,
      props.smallVertical && styles.smallMarginVertical,
      props.largeHorizontal && styles.largeMarginHorizontal,
      props.largeVertical && styles.largeMarginVertical,
      props.style
    ]}
  >
    {props.children}
  </View>
);
Spacer.small = 10;
Spacer.normal = 20;
Spacer.large = 40;

const styles = StyleSheet.create({
  default: {
    flex: 1
  },
  normalMargin: {
    marginHorizontal: Spacer.normal / 2,
    marginVertical: Spacer.normal / 2
  },
  normalMarginHorizontal: {
    marginHorizontal: Spacer.normal / 2
  },
  normalMarginVertical: {
    marginVertical: Spacer.normal / 2
  },
  smallMargin: {
    marginHorizontal: Spacer.small / 2,
    marginVertical: Spacer.small / 2
  },
  smallMarginVertical: {
    marginVertical: Spacer.small / 2
  },
  smallMarginHorizontal: {
    marginHorizontal: Spacer.small / 2
  },
  largeMargin: {
    marginHorizontal: Spacer.large / 2,
    marginVertical: Spacer.large / 2
  },
  largeMarginHorizontal: {
    marginHorizontal: Spacer.large / 2
  },
  largeMarginVertical: {
    marginVertical: Spacer.large / 2
  }
});

export default Spacer;
