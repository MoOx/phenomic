// @flow

import * as React from "react";
import { View, StyleSheet } from "react-native-web";
import { withPhenomicApi, query } from "@phenomic/preset-react-app/lib/client";

import Link from "./Link";
import Flex from "./Flex";
import Spacer from "./Spacer";
import ActivityIndicator from "./ActivityIndicator";
import PageError from "./PageError";
import Header from "./Header";
import Footer from "./Footer";
import BodyContainer from "./BodyContainer";
import BlogListItem from "./BlogListItem";

const BlogList = (props: Object) => {
  if (props.hasError) {
    return <PageError error={props.list.error} />;
  }

  return (
    <Flex>
      <Header title={"Blog"} />
      <BodyContainer style={styles.container}>
        {props.isLoading && <ActivityIndicator />}
        {!props.isLoading && (
          <React.Fragment>
            <View style={styles.list}>
              {props.list.node.list.map(item => (
                <BlogListItem key={item.id} item={item} />
              ))}
            </View>
            <Spacer />
            <View style={styles.paginationRow}>
              <View style={styles.paginationColumn}>
                {props.list.node &&
                  props.list.node.next && (
                    <Link
                      style={styles.link}
                      href={`/en/blog/after/${props.list.node.next}`}
                    >
                      {"← Previous entries"}
                    </Link>
                  )}
              </View>
              <View style={styles.paginationColumn}>
                {props.list.node &&
                  props.list.node.previous && (
                    <Link
                      style={styles.link}
                      href={
                        props.list.node.previousPageIsFirst
                          ? `/en/blog`
                          : `/en/blog/after/${props.list.node.previous}`
                      }
                    >
                      {"Recent entries →"}
                    </Link>
                  )}
              </View>
            </View>
          </React.Fragment>
        )}
      </BodyContainer>
      <Spacer large />
      <Footer />
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start"
  },
  paginationRow: {
    flexDirection: "row"
  },
  paginationColumn: {
    width: "50%",
    padding: 10,
    // alignItems: "center",
    justifyContent: "center"
  }
});

export default withPhenomicApi(BlogList, props => ({
  list: query({
    path: "content/blog",
    limit: 12,
    after: props.params.after
  })
}));
