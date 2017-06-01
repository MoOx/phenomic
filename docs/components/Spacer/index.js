import React from "react";
import { StyleSheet, View } from "react-primitives";

type PropsType = {
  small?: boolean,
  large?: boolean
};
const Spacer = (props: PropsType) => (
  <View
    style={[
      styles.container,
      props.small && styles.small,
      props.large && styles.large
    ]}
  />
);

const styles = StyleSheet.create({
  container: {
    width: 20,
    height: 20
  },
  small: {
    width: 10,
    height: 10
  },
  large: {
    width: 40,
    height: 40
  }
});

export default Spacer;
