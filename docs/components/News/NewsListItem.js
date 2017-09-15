import * as React from "react";
import { View, Text, StyleSheet } from "react-native-web";
import { Link } from "react-router";

const NewsListItem = props => (
  <Link to={"/news/" + props.news.id} style={rawStyles.link}>
    <View style={styles.container}>
      <Text style={styles.title}>{props.news.title}</Text>
      <Text style={styles.date}>
        {new Date(props.news.date).toLocaleDateString()}
      </Text>
    </View>
  </Link>
);

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "rgba(0, 0, 0, 0.1)"
  },
  title: {
    fontWeight: "700",
    fontSize: 24,
    textAlign: "center",
    paddingBottom: 12
  },
  date: {
    color: "rgba(0, 0, 0, 0.5)",
    fontSize: 14,
    textAlign: "center"
  }
});

const rawStyles = {
  link: { textDecoration: "none", color: "inherit" }
};

export default NewsListItem;
