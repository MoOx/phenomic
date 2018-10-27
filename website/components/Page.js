// @flow

import * as React from "react";
import { StyleSheet, View, Text } from "react-native-web";
/* eslint-disable-next-line */
import PropTypes from "prop-types";
/* eslint-disable-next-line */
import { isActive } from "@phenomic/plugin-renderer-react/lib/components/Link.js";

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

const layouts = {
  Default: props => (
    <MarkdownGenerated body={props.node.body} filename={props.node.filename} />
  ),
};

const sort = (a, b) => {
  if (a.priority && b.priority) {
    if (a.priority < b.priority) return -1;
    if (a.priority > b.priority) return 1;
  }
  if (a.priority) return 1;
  if (b.priority) return -1;
  if (a.id < b.id) return -1;
  if (a.id > b.id) return 1;
  return 0;
};

export function readPkgFromId(id: string) {
  const pieces = id ? id.split("/") : [];
  return pieces.shift();
}

// eslint-disable-next-line react/no-multi-comp
const Page = (props: Object, context: Object) => {
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

  const currentPkg = readPkgFromId(props.params.splat);

  return (
    <Flex>
      <Header
        title={props.page && props.page.node && props.page.node.title}
        subtitle={props.page && props.page.node && props.page.node.subtitle}
      />
      <Container>
        <View style={styles.row}>
          {props.pages && (
            <Spacer large={true} style={styles.sidebar}>
              {props.pages.node &&
                props.pages.node.list
                  .filter(
                    p =>
                      readPkgFromId(p.id) == currentPkg &&
                      // avoid package.json files
                      !p.title.endsWith("package.json"),
                  )
                  .sort(sort)
                  .map(page => {
                    const href = `/en/packages/${page.id}/`;
                    return (
                      <React.Fragment key={page.id}>
                        <Stylable
                          style={styles.sidebarLink}
                          activeStyle={styles.sidebarLinkActive}
                          hoveredOrFocusedStyle={styles.sidebarLinkFocused}
                        >
                          <Link href={href}>
                            <Spacer>
                              <Text>{page.title}</Text>
                            </Spacer>
                          </Link>
                        </Stylable>
                        {isActive(href, context) && (
                          <View>
                            {Array.isArray(page.headings) &&
                              page.headings
                                .map(
                                  h =>
                                    h.level === 1 &&
                                    page.title === h.text ? null : (
                                      <Stylable
                                        style={[
                                          styles.sidebarHeadingLink,
                                          styles[
                                            "sidebarHeadingLink" + h.level
                                          ],
                                        ]}
                                        activeStyle={[
                                          styles.sidebarHeadingLinkActive,
                                          styles[
                                            "sidebarHeadingLink" +
                                              h.level +
                                              "Active"
                                          ],
                                        ]}
                                        hoveredOrFocusedStyle={[
                                          styles.sidebarHeadingLinkFocused,
                                          styles[
                                            "sidebarHeadingLink" +
                                              h.level +
                                              "Focused"
                                          ],
                                        ]}
                                      >
                                        <Link href={href + "#" + h.id}>
                                          <Spacer small={true} key={h.text}>
                                            <Text>{h.text}</Text>
                                          </Spacer>
                                        </Link>
                                      </Stylable>
                                    ),
                                )
                                .filter(heading => heading)}
                          </View>
                        )}
                      </React.Fragment>
                    );
                  })}
            </Spacer>
          )}
          <Spacer large={true} style={styles.content}>
            {props.isLoading && <ActivityIndicator />}
            {!props.isLoading && <Layout node={props.page.node} />}
          </Spacer>
        </View>
      </Container>
      <Spacer large={true} />
      <Footer />
    </Flex>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  sidebar: {
    flex: 0,
    flexBasis: 250,
    marginTop: 30,
  },
  sidebarLink: {
    fontSize: 18,
    color: "#006BF6",
    borderLeftWidth: 4,
    borderLeftStyle: "solid",
    borderLeftColor: "transparent",
  },
  sidebarLinkActive: {
    borderLeftColor: "#02CA83",
  },
  sidebarLinkFocused: {
    color: "#fff",
    backgroundColor: "#006BF6",
  },
  sidebarHeadingLink: {
    fontWeight: "300",
    color: "#006BF6",
  },
  sidebarHeadingLinkActive: {
    borderLeftColor: "#02CA83",
  },
  sidebarHeadingLinkFocused: {
    color: "#fff",
    backgroundColor: "#006BF6",
  },
  /* eslint-disable react-native/no-unused-styles */
  sidebarHeadingLink1: { marginLeft: Spacer.small * 1 },
  sidebarHeadingLink2: { marginLeft: Spacer.small * 2 },
  sidebarHeadingLink3: { marginLeft: Spacer.small * 3 },
  sidebarHeadingLink4: { marginLeft: Spacer.small * 4 },
  sidebarHeadingLink5: { marginLeft: Spacer.small * 5 },
  sidebarHeadingLink6: { marginLeft: Spacer.small * 6 },
  /* eslint-enable react-native/no-unused-styles */
  content: {
    flex: 2,
    flexBasis: 400,
  },
});

export default Page;
