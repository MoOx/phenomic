import React from "react";
import { StyleSheet, View, Text } from "react-primitives";

const Editor = (props: Object) =>
  <View style={styles.editor}>
    <View style={styles.header}>
      <Text>{props.header}</Text>
    </View>
    <View style={styles.content}>
      <pre style={{ margin: 0 }}>{props.children}</pre>
    </View>
  </View>;

const radius = 4;
const padding = 8;
const styles = StyleSheet.create({
  editor: {
    flex: 1
  },
  header: {
    fontSize: 12,
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    padding: padding,
    color: "rgba(203, 211, 219, 0.75)",
    backgroundColor: "#12171C",
    borderBottomWidth: 1,
    borderBottomColor: "#0E1216"
  },
  content: {
    flex: 1,
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: radius,
    padding: padding,
    color: "#CDE4FF",
    backgroundColor: "#171D23"
  }
});

export default Editor;
