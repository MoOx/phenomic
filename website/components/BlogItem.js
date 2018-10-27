// @flow

import * as React from "react";
import { withPhenomicApi, query } from "@phenomic/preset-react-app/lib/client";
import { StyleSheet, Text } from "react-native-web";

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
    return <PageError error={props.item.error} />;
  }

  return (
    <Flex>
      <Header title={props.item && props.item.node && props.item.node.title} />
      <BodySmallContainer>
        <Spacer large={true}>
          {props.isLoading && <ActivityIndicator />}
          {!props.isLoading && (
            <React.Fragment>
              <Text style={styles.date}>
                {new Date(props.item.node.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </Text>
              <MarkdownGenerated
                body={props.item.node.body}
                filename={props.item.node.filename}
              />
            </React.Fragment>
          )}
        </Spacer>
      </BodySmallContainer>
      <Spacer large={true} />
      <Footer />
    </Flex>
  );
};

const styles = StyleSheet.create({
  date: {
    position: "absolute",
    right: 0,
    top: 0,
    color: "rgba(0, 0, 0, 0.25)",
    fontSize: 14,
    textAlign: "right",
  },
});

export default withPhenomicApi(BlogItem, props => ({
  item: query({
    path: "content/blog",
    id: props.params.splat,
  }),
}));
