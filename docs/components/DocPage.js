import React from "react";
import { View, Text, ActivityIndicator, StyleSheet } from "react-native-web";
import { createContainer, query } from "@phenomic/preset-react-app/lib/client";

import MarkdownGenerated from "./MarkdownGenerated";
import PageError from "./PageError";

const DocPage = (props: Object) => {
  if (props.hasError) {
    return <PageError error={props.page.error} />;
  }

  return (
    <View>
      {props.isLoading && <ActivityIndicator />}
      {!props.isLoading &&
        <View style={styles.page}>
          <Text style={styles.title}>{props.page.node.title}</Text>
          <MarkdownGenerated body={props.page.node.body} />
        </View>}
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    padding: 10,
    maxWidth: 800,
    width: "100%",
    alignSelf: "center"
  },
  title: {
    fontSize: 40,
    fontWeight: "900"
  }
});

export default createContainer(DocPage, props => ({
  page: query({
    collection: "docs",
    id: props.params.splat
  })
}));
