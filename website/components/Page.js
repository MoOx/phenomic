// @flow

import * as React from "react";
import { StyleSheet, View, Text } from "react-native-web";

import Stylable from "./react-stylable";
import Flex from "./Flex";
import Link from "./Link";
import Spacer from "./Spacer";
import ActivityIndicator from "./ActivityIndicator";
import MarkdownGenerated from "./MarkdownGenerated";
import PageError from "./PageError";
import Header from "./Header";
import Footer from "./Footer";
import BodyContainer from "./BodyContainer";
import BodySmallContainer from "./BodySmallContainer";
import GettingStarted from "./GettingStarted";

const layouts = {
  Default: props => <MarkdownGenerated body={props.node.body} />,
  GettingStarted
};

// eslint-disable-next-line react/no-multi-comp
const Page = (props: Object) => {
  if (props.hasError) {
    return <PageError error={props.page.error} />;
  }

  const Container = props.pages ? BodyContainer : BodySmallContainer;
  let Layout = layouts.Default;
  if (
    props.page &&
    props.page.node &&
    props.page.node.layout &&
    layouts[props.page.node.layout]
  ) {
    Layout = layouts[props.page.node.layout];
  }
  return (
    <Flex>
      <Header
        title={props.page && props.page.node && props.page.node.title}
        subtitle={props.page && props.page.node && props.page.node.subtitle}
      />
      <Container>
        <View style={styles.row}>
          {props.pages && (
            <Spacer large style={styles.sidebar}>
              {props.pages.node &&
                props.pages.node.list
                  .sort((a, b) => {
                    if (a.priority && b.priority) {
                      if (a.priority < b.priority) return -1;
                      if (a.priority > b.priority) return 1;
                    }
                    if (a.priority) return 1;
                    if (b.priority) return -1;
                    if (a.id < b.id) return -1;
                    if (a.id > b.id) return 1;
                    return 0;
                  })
                  .map(page => (
                    <Stylable
                      key={page.id}
                      style={styles.sidebarLink}
                      activeStyle={styles.sidebarLinkActive}
                      hoveredOrFocusedStyle={styles.sidebarLinkFocused}
                    >
                      <Link
                        href={
                          "/en/docs/" +
                          props.queries.pages.path
                            .replace("packages/", "")
                            .replace("/docs", "")
                            .replace(/(plugin|preset)-/, "$1/") +
                          "/" +
                          page.id
                            .replace(/^docs$/, "")
                            .replace(/^docs\/(.*)/, "$1/")
                        }
                      >
                        <Spacer large>
                          <Text>{page.title}</Text>
                        </Spacer>
                      </Link>
                    </Stylable>
                  ))}
            </Spacer>
          )}
          <Spacer large>
            {props.isLoading && <ActivityIndicator />}
            {!props.isLoading && <Layout node={props.page.node} />}
          </Spacer>
        </View>
      </Container>
      <Spacer large />
      <Footer />
    </Flex>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  sidebar: {
    flex: 0,
    width: 250,
    marginTop: 30
  },
  sidebarLink: {
    fontSize: 18,
    fontWeight: "300",
    color: "#006BF6",
    borderLeftWidth: 4,
    borderLeftStyle: "solid",
    borderLeftColor: "transparent"
  },
  sidebarLinkFocused: {
    color: "#fff",
    backgroundColor: "#006BF6"
  },
  sidebarLinkActive: {
    borderLeftColor: "#02CA83"
  }
});

export default Page;
