import * as React from "react";
import { StyleSheet, View } from "react-native-web";

type PropsType = {|
  small?: boolean,
  large?: boolean
|};
const Spacer = (props: PropsType) => (
  <View
    style={[
      styles.container,
      props.small && styles.small,
      props.large && styles.large
    ]}
  />
);
Spacer.small = 10;
Spacer.default = 20;
Spacer.large = 40;

const styles = StyleSheet.create({
  container: {
    width: Spacer.default,
    height: Spacer.default
  },
  small: {
    width: Spacer.small,
    height: Spacer.small
  },
  large: {
    width: Spacer.large,
    height: Spacer.large
  }
});

export default Spacer;
