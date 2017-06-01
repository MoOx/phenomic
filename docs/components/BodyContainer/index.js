import React from "react";
import { StyleSheet, View } from "react-primitives";

const BodyContainer = (props: Object) => (
  <View style={[props.style, styles.container]}>{props.children}</View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    maxWidth: 900,
    marginLeft: "auto",
    marginRight: "auto"
  }
});

export default BodyContainer;
