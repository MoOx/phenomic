import React from "react";
import { View } from "react-primitives";

import ActivityIndicator from "../ActivityIndicator";
import MarkdownGenerated from "../MarkdownGenerated";
import PageError from "../PageError";
import Header from "../Header";
import BodyContainer from "../BodyContainer";

const Page = (props: Object) => {
  if (props.hasError) {
    return <PageError error={props.page.error} />;
  }

  return (
    <View>
      <Header title={props.page && props.page.node && props.page.node.title} />
      <BodyContainer>
        {props.isLoading && <ActivityIndicator />}
        {!props.isLoading && <MarkdownGenerated body={props.page.node.body} />}
      </BodyContainer>
    </View>
  );
};

export default Page;
