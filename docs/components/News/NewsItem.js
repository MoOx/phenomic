import React from "react";
import { createContainer, query } from "@phenomic/preset-react-app/lib/client";
import { View, StyleSheet } from "react-primitives";

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
        {!props.isLoading &&
          <View style={styles.body}>
            <MarkdownGenerated body={props.news.node.body} />
          </View>}
      </BodyContainer>
      <Spacer large />
      <Footer />
    </Flex>
  );
};

const styles = StyleSheet.create({
  body: {
    maxWidth: 600,
    paddingHorizontal: 10,
    alignSelf: "center"
  }
});

export default createContainer(NewsItem, props => ({
  news: query({
    collection: "news",
    id: props.params.splat
  })
}));
