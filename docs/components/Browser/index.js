import * as React from "react";
import { StyleSheet, View } from "react-native-web";

/* eslint-disable react-native/no-inline-styles */

const Browser = (props: Object) => (
  <View style={[props.style, styles.editor]}>
    <View style={styles.header}>
      <View style={[styles.bullet, { backgroundColor: "#FC4948" }]} />
      <View style={[styles.bullet, { backgroundColor: "#FDB424" }]} />
      <View style={[styles.bullet, { backgroundColor: "#29C231" }]} />
    </View>
    <View style={styles.content}>
      <View style={styles.contentContainer}>{props.children}</View>
    </View>
  </View>
);

const radius = 4;
const padding = 8;
const bulletSize = 8;
const styles = StyleSheet.create({
  editor: {
    flexGrow: 1
  },
  header: {
    flexDirection: "row",
    // fontSize: 12,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    padding: padding,
    backgroundColor: "#12171C"
  },
  bullet: {
    width: bulletSize,
    height: bulletSize,
    borderRadius: bulletSize,
    marginRight: bulletSize / 2
  },
  content: {
    flexGrow: 1,
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: radius,
    padding: 6,
    paddingTop: 0,
    backgroundColor: "#171D23"
  },
  contentContainer: {
    flexGrow: 1,
    backgroundColor: "#fff"
  }
});

export default Browser;
