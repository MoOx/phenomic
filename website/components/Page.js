import * as React from "react";

import Flex from "./Flex";
import Spacer from "./Spacer";
import ActivityIndicator from "./ActivityIndicator";
import MarkdownGenerated from "./MarkdownGenerated";
import PageError from "./PageError";
import Header from "./Header";
import Footer from "./Footer";
import BodyContainer from "./BodyContainer";

const Page = (props: Object) => {
  if (props.hasError) {
    return <PageError error={props.page.error} />;
  }

  return (
    <Flex>
      <Header title={props.page && props.page.node && props.page.node.title} />
      <BodyContainer>
        {props.isLoading && <ActivityIndicator />}
        {!props.isLoading && <MarkdownGenerated body={props.page.node.body} />}
      </BodyContainer>
      <Spacer large />
      <Footer />
    </Flex>
  );
};

export default Page;
