import * as React from "react";
import { withPhenomicApi, query } from "@phenomic/preset-react-app/lib/client";
import { View, StyleSheet, Text } from "react-native-web";

import Flex from "../Flex";
import Spacer from "../Spacer";
import ActivityIndicator from "../ActivityIndicator";
import MarkdownGenerated from "../MarkdownGenerated";
import PageError from "../PageError";
import Header from "../Header";
import Footer from "../Footer";
import BodyContainer from "../BodyContainer";

const NewsItem = (props: Object) => {
  if (props.hasError) {
    return <PageError error={props.news.error} />;
  }

  return (
    <Flex>
      <Header title={props.news && props.news.node && props.news.node.title} />
      <BodyContainer>
        {props.isLoading && <ActivityIndicator />}
        {!props.isLoading && (
          <View style={styles.body}>
            <Text style={styles.date}>
              {new Date(props.news.node.date).toLocaleDateString()}
            </Text>
            <MarkdownGenerated body={props.news.node.body} />
          </View>
        )}
      </BodyContainer>
      <Spacer large />
      <Footer />
    </Flex>
  );
};

const styles = StyleSheet.create({
  body: {
    maxWidth: 600,
    paddingVertical: 24,
    alignSelf: "center"
  },
  date: {
    color: "rgba(0, 0, 0, 0.25)",
    fontSize: 14,
    textAlign: "right"
  }
});

export default withPhenomicApi(NewsItem, props => ({
  news: query({
    path: "news",
    id: props.params.splat
  })
}));
