import * as React from "react";
import { withPhenomicApi, query } from "@phenomic/preset-react-app/lib/client";

import Flex from "./Flex";
import Spacer from "./Spacer";
import ActivityIndicator from "./ActivityIndicator";
import PageError from "./PageError";
import Header from "./Header";
import Footer from "./Footer";
import BodyContainer from "./BodyContainer";
import NewsListItem from "./NewsListItem";

const NewsList = (props: Object) => {
  if (props.hasError) {
    return <PageError error={props.page.error} />;
  }

  return (
    <Flex>
      <Header title={"News"} />
      <BodyContainer>
        {props.isLoading && <ActivityIndicator />}
        {!props.isLoading &&
          props.news.node.list.map(item => (
            <NewsListItem key={item.id} news={item} />
          ))}
      </BodyContainer>
      <Spacer large />
      <Footer />
    </Flex>
  );
};

export default withPhenomicApi(NewsList, props => ({
  news: query({
    path: "news",
    limit: 10,
    after: props.params.after
  })
}));
