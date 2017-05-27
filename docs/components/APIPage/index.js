import React from "react";
import { View, Text, StyleSheet } from "react-primitives";
import { createContainer, query } from "@phenomic/preset-react-app/lib/client";

import Link from "../Link";
import ActivityIndicator from "../ActivityIndicator";
import MarkdownGenerated from "../MarkdownGenerated";
import PageError from "../PageError";

const APIPage = (props: Object) => {
  if (props.hasError) {
    return <PageError error={props.page.error} />;
  }

  return (
    <View>
      <View style={styles.page}>
        <View style={styles.column}>
          <Text style={styles.menuTitle}>
            {"API Reference"}
          </Text>
          {props.apis.status === "loading" && <ActivityIndicator />}
          {props.apis.status === "idle" &&
            props.apis.node.list.map(api => (
              <View key={api.id}>
                <Link to={`/api/${api.id}`}>
                  <Text style={styles.property}>
                    {api.title}
                  </Text>
                </Link>
              </View>
            ))}
          <Text style={styles.menuTitle}>
            {"Tags"}
          </Text>
          {props.tags.status === "loading" && <ActivityIndicator />}
          {props.tags.status === "idle" &&
            props.tags.node.list.map(tag => (
              <View key={tag.id}>
                <Link to={`/api/tag/${tag.key}`}>
                  <Text style={styles.property}>
                    {tag.value}
                  </Text>
                </Link>
              </View>
            ))}
        </View>
        <View>
          <Text style={styles.title}>{props.page.title}</Text>
          {props.page.status === "loading" && <ActivityIndicator />}
          {props.page.status === "idle" &&
            <View>
              <Text style={styles.title}>
                {props.page.node.title}
              </Text>
              <MarkdownGenerated body={props.page.node.body} />
            </View>}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  menuTitle: {
    fontWeight: "900"
  },
  page: {
    padding: 10,
    maxWidth: 800,
    width: "100%",
    alignSelf: "center",
    flexDirection: "row"
  },
  column: {
    width: "30%"
  },
  title: {
    fontSize: 40,
    fontWeight: "900"
  },
  property: {
    backgroundColor: "#fafafa",
    borderRadius: 2,
    fontFamily: "monospace"
  }
});

export default createContainer(APIPage, props => ({
  apis: query({
    collection: "api"
  }),
  tags: query({
    collection: "tags",
    by: "collection",
    value: "api"
  }),
  page: query({
    collection: "api",
    id: props.params.splat
  })
}));
