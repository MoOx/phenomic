import * as React from "react";
import { StyleSheet, View } from "react-native-web";

const BodyContainer = (props: Object) => (
  <View style={[props.style, styles.container]}>{props.children}</View>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    width: "100%",
    maxWidth: 700,
    marginLeft: "auto",
    marginRight: "auto"
  }
});

export default BodyContainer;
