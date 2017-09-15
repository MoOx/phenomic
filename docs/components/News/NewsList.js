import * as React from "react";
import { createContainer, query } from "@phenomic/preset-react-app/lib/client";
import { View, StyleSheet } from "react-native-web";

import Flex from "../Flex";
import Spacer from "../Spacer";
import ActivityIndicator from "../ActivityIndicator";
import PageError from "../PageError";
import Header from "../Header";
import Footer from "../Footer";
import BodyContainer from "../BodyContainer";
import NewsListItem from "../News/NewsListItem";

const NewsList = (props: Object) => {
  if (props.hasError) {
    return <PageError error={props.page.error} />;
  }

  return (
    <Flex>
      <Header title={"News"} />
      <BodyContainer>
        {props.isLoading && <ActivityIndicator />}
        {!props.isLoading && (
          <View style={styles.container}>
            {props.news.node.list.map(item => (
              <NewsListItem key={item.id} news={item} />
            ))}
          </View>
        )}
      </BodyContainer>
      <Spacer large />
      <Footer />
    </Flex>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: "stretch"
  }
});

export default createContainer(NewsList, props => ({
  news: query({
    path: "news",
    limit: 10,
    after: props.params.after
  })
}));
