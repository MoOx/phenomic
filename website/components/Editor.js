import * as React from "react";
import { StyleSheet, View, Text } from "react-native-web";

const Editor = (props: Object) => (
  <View style={styles.editor}>
    <View style={styles.header}>
      <Text style={styles.headerText}>{props.header}</Text>
    </View>
    <View style={styles.content}>
      <pre style={rawStyles.contentPre}>{props.children}</pre>
    </View>
  </View>
);

const radius = 4;
const padding = 14;
const styles = StyleSheet.create({
  editor: {
    flexGrow: 1
  },
  header: {
    borderTopLeftRadius: radius,
    borderTopRightRadius: radius,
    padding: padding,
    backgroundColor: "#12171C",
    borderBottomWidth: 1,
    borderBottomColor: "#0E1216"
  },
  headerText: {
    fontSize: 14,
    color: "rgba(203, 211, 219, 0.65)"
  },
  content: {
    flexGrow: 1,
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: radius,
    padding,
    backgroundColor: "#171D23"
  }
});

const rawStyles = {
  contentPre: {
    fontSize: 18,
    lineHeight: 1.5,
    margin: 0,
    color: "#CDE4FF"
  }
};

export default Editor;
