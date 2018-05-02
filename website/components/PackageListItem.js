// @flow

import * as React from "react";
import { View, Text, StyleSheet } from "react-native-web";

import Link from "./Link";

const PackageListItem = (props: {| package: Object |}) => (
  <Link.Block
    href={"/package/" + props.package.id}
    style={styles.link}
    blockProps={{ style: styles.block }}
  >
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.name}>{props.package.name}</Text>
      </View>
      {props.package.author && (
        <Text style={styles.author}>{"By " + props.package.author}</Text>
      )}
      {props.package.authors &&
        props.package.authors.map(author => (
          <Text key={author} style={styles.author}>
            {"By " + author}
          </Text>
        ))}
    </View>
  </Link.Block>
);

const styles = StyleSheet.create({
  block: {
    // flexBasis: 400,
    minWidth: 250,
    width: "33%"
  },
  wrapper: {
    flexGrow: 1,
    marginHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0, 0, 0, 0.1)"
  },
  link: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    textDecorationLine: "none",
    color: "inherit",
    paddingVertical: 20,
    paddingHorizontal: 10
  },
  name: {
    fontWeight: "700",
    fontSize: 22,
    paddingBottom: 10
  },
  author: {
    fontWeight: "100",
    paddingVertical: 10
  }
});

export default PackageListItem;
