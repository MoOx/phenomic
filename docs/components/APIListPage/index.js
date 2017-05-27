import React from "react";
import { View, Text, StyleSheet } from "react-primitives";
import { createContainer, query } from "@phenomic/preset-react-app/lib/client";

import Link from "../Link";
import ActivityIndicator from "../ActivityIndicator";

const APIListPage = (props: Object) => (
  <View>
    {props.isLoading && <ActivityIndicator />}
    {!props.isLoading &&
      <View style={styles.page}>
        <Text style={styles.title}>
          {"API Reference"}
        </Text>
        {props.apis.node.list.map(api => (
          <View key={api.id}>
            <Link to={`/api/${api.id}`}>
              <Text style={styles.property}>
                {api.title}
              </Text>
            </Link>
          </View>
        ))}
      </View>}
  </View>
);

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
  },
  property: {
    backgroundColor: "#fafafa",
    borderRadius: 2,
    fontFamily: "monospace"
  }
});

export default createContainer(APIListPage, () => ({
  apis: query({
    collection: "api"
  })
}));
