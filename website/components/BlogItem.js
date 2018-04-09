import * as React from "react";
import { withPhenomicApi, query } from "@phenomic/preset-react-app/lib/client";
import { View, StyleSheet, Text } from "react-native-web";

import Flex from "./Flex";
import Spacer from "./Spacer";
import ActivityIndicator from "./ActivityIndicator";
import MarkdownGenerated from "./MarkdownGenerated";
import PageError from "./PageError";
import Header from "./Header";
import Footer from "./Footer";
import BodySmallContainer from "./BodySmallContainer";

const BlogItem = (props: Object) => {
  if (props.hasError) {
    return <PageError error={props.news.error} />;
  }

  return (
    <Flex>
      <Header title={props.news && props.news.node && props.news.node.title} />
      <BodySmallContainer>
        {props.isLoading && <ActivityIndicator />}
        {!props.isLoading && (
          <View style={styles.body}>
            <Text style={styles.date}>
              {new Date(props.news.node.date).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric"
              })}
            </Text>
            <MarkdownGenerated body={props.news.node.body} />
          </View>
        )}
      </BodySmallContainer>
      <Spacer large />
      <Footer />
    </Flex>
  );
};

const styles = StyleSheet.create({
  body: {
    paddingVertical: 24
  },
  date: {
    color: "rgba(0, 0, 0, 0.25)",
    fontSize: 14,
    textAlign: "right"
  }
});

export default withPhenomicApi(BlogItem, props => ({
  news: query({
    path: "blog",
    id: props.params.splat
  })
}));
