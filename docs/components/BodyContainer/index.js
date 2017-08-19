import React from "react";
import { StyleSheet, View } from "react-primitives";

const BodyContainer = (props: Object) =>
  <View style={[props.style, styles.container]}>{props.children}</View>;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 900,
    marginLeft: "auto",
    marginRight: "auto"
  }
});

export default BodyContainer;
