// @flow

import * as React from "react";
import { View, Text, StyleSheet } from "react-native-web";

import Link from "./Link";

const BlogListItem = props => (
  <Link.Block
    href={"/blog/" + props.news.id}
    style={styles.link}
    blockProps={{ style: styles.block }}
  >
    <View style={styles.wrapper}>
      <View>
        <Text style={styles.title}>{props.news.title}</Text>
      </View>
      <Text style={styles.date}>
        {new Date(props.news.date).toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric"
        })}
      </Text>
      {props.news.author && (
        <Text style={styles.author}>{"By " + props.news.author}</Text>
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
  title: {
    fontWeight: "700",
    fontSize: 22,
    paddingBottom: 10
  },
  date: {
    color: "rgba(0, 0, 0, 0.5)",
    fontSize: 14
  },
  author: {
    fontWeight: "100",
    paddingVertical: 10
  }
});

export default BlogListItem;
