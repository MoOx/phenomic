import React from "react";
import { StyleSheet, View } from "react-primitives";

const Flex = (props: Object) =>
  <View style={[props.style, styles.flex]}>
    {props.children}
  </View>;

const styles = StyleSheet.create({
  flex: {
    flex: 1
  }
});

export default Flex;
