// @flow

import * as React from "react";
import { View, Text, StyleSheet } from "react-native-web";

import Link from "./Link";

const PackageListItem = (props: {| package: Object |}) => (
  <Link.Block
    href={"/en/packages/" + props.package.id.replace(/package$/, "docs") + "/"}
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
      {props.package.authors && (
        <Text style={styles.author}>
          {"By "}
          {props.package.authors
            .map(author => {
              let a = author;
              // remove <email> (avoid spam)
              a = a.replace(/ <.+@.+>/g, "");
              // assume "Name (nick)" => "Name @github"
              a = a.replace(/ \(([a-zA-Z_]+)\)/g, " @$1");
              // no space at all? assume github handle
              if (!a.includes(" ")) {
                a = "@" + a;
              }
              // if something looks like a github handle, we only show that
              if (
                a.includes("@") &&
                (a.startsWith("@") || a.includes("(@") || a.includes(" @"))
              ) {
                a = a.slice(a.indexOf("@"));
              }
              return a;
            })
            .join(", ")}
        </Text>
      )}
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
    color: "#999"
  }
});

export default PackageListItem;
