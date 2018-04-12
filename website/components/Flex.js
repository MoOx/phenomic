// @flow

import * as React from "react";
import { StyleSheet, View } from "react-native-web";

const Flex = (props: Object) => (
  <View style={[styles.flex, props.style]}>{props.children}</View>
);

const styles = StyleSheet.create({
  flex: {
    flexGrow: 1
  }
});

export default Flex;
