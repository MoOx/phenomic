// @flow

import * as React from "react";
import { View, Text, Image, StyleSheet, createElement } from "react-native-web";
import { withPhenomicApi, query } from "@phenomic/preset-react-app/lib/client";

import urlToSlug from "../modules/url-to-slug";
import { screenshotsSize } from "../package.json";

import Flex from "./Flex";
import Link from "./Link";
import Spacer from "./Spacer";
import ActivityIndicator from "./ActivityIndicator";
import Header from "./Header";
import Footer from "./Footer";
import BodyContainer from "./BodyContainer";

const Div = props => createElement("div", props);
// eslint-disable-next-line react/no-multi-comp
const ShowcaseList = (props: Object) => (
  <Flex>
    <Header headTitle={"Phenomic Showcase "} title={"Who's using Phenomic?"} />
    <BodyContainer style={styles.page}>
      {props.isLoading && <ActivityIndicator />}
      {!props.isLoading && (
        <View>
          <Link href={"/en/showcase/submit/"} style={styles.addYourOwn}>
            {"+ Add your website"}
          </Link>
          {props.params &&
            props.params.showcaseTags && (
              <View style={styles.currentFilter}>
                <Text style={styles.filterMessage}>
                  {"You are currently viewing projects that match "}
                  <em>{props.params.showcaseTags}</em>
                  {" tag. "}
                  <Link href={"/en/showcase/"} style={styles.filterMessageLink}>
                    {"View all."}
                  </Link>
                </Text>
              </View>
            )}
          <View style={styles.list}>
            {props.showcase.node.list.map(item => (
              <View style={styles.item} key={item.id}>
                <View style={styles.row}>
                  <Text style={styles.itemName}>{item.title}</Text>
                  <Text>{" "}</Text>
                  {item.source && (
                    <Link
                      style={styles.itemLinkSource}
                      href={item.source}
                      target="_blank"
                    >
                      {"(Source)"}
                    </Link>
                  )}
                </View>
                <View style={styles.tags}>
                  {item.showcaseTags &&
                    item.showcaseTags.map(tag => (
                      <Link
                        key={tag}
                        href={`/en/showcase/tag/${tag}/`}
                        style={styles.itemTag}
                      >
                        {tag}
                      </Link>
                    ))}
                </View>
                <a href={item.url} target="_blank" rel="noopener noreferrer">
                  <Image
                    source={{
                      uri: `/showcase/entry/${urlToSlug(item.url)}-large.jpg`,
                    }}
                    style={styles.imageLarge}
                    resizeMode="cover"
                  />
                  <Div style={styles.imageContainerSmall}>
                    <Image
                      source={{
                        uri: `/showcase/entry/${urlToSlug(item.url)}-small.jpg`,
                      }}
                      style={styles.imageSmall}
                      resizeMode="cover"
                    />
                  </Div>
                </a>
              </View>
            ))}
          </View>
          <View style={styles.paginationRow}>
            <View style={styles.paginationColumn}>
              {props.showcase.node &&
                props.showcase.node.previous && (
                  <Link
                    style={styles.link}
                    href={
                      props.showcase.node.previousPageIsFirst
                        ? `/en/showcase`
                        : `/en/showcase/${
                            props.params.showcaseTags
                              ? `tag/${props.params.showcaseTags}/`
                              : ""
                          }after/${props.showcase.node.previous}`
                    }
                  >
                    {"← Previous"}
                  </Link>
                )}
            </View>
            <View style={styles.paginationColumn}>
              {props.showcase.node &&
                props.showcase.node.next && (
                  <Link
                    style={styles.link}
                    href={`/en/showcase/${
                      props.params.showcaseTags
                        ? `tag/${props.params.showcaseTags}/`
                        : ""
                    }after/${props.showcase.node.next}`}
                  >
                    {"Next →"}
                  </Link>
                )}
            </View>
          </View>
        </View>
      )}
    </BodyContainer>
    <Spacer large={true} />
    <Footer />
  </Flex>
);

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
  },
  page: {
    paddingTop: 10,
    paddingBottom: 10,
  },
  addYourOwn: {
    justifyContent: "flex-end",
    position: "absolute",
    right: 20,
    top: -40,
    fontSize: 16,
    color: "#fff",
    textDecorationLine: "underline",
  },
  currentFilter: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "center",
  },
  filterMessage: {
    padding: 10,
    color: "#4078c0",
    backgroundColor: "#e6f1f6",
    borderRadius: 3,
  },
  filterMessageLink: {
    color: "#4078c0",
    fontWeight: "bold",
  },
  list: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  item: {
    flexGrow: 1,
    minWidth: 250,
    position: "relative",
    width: "50%",
    padding: 20,
  },
  imageLarge: {
    flexGrow: 1,
    paddingBottom:
      (100 * screenshotsSize.large.height) / screenshotsSize.large.width + "%",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.1)",
    borderRadius: 4,
  },
  imageContainerSmall: {
    position: "absolute",
    right: -10,
    bottom: -10,
    width: "20%",
  },
  imageSmall: {
    flexGrow: 1,
    width: "100%",
    paddingBottom:
      (100 * screenshotsSize.small.height) / screenshotsSize.small.width + "%",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.1)",
    borderRadius: 4,
  },
  itemName: {
    fontWeight: "700",
    fontSize: 18,
    lineHeight: 18 * 2,
    color: "#424345",
  },
  itemLinkSource: {
    fontSize: 12,
    textDecorationLine: "none",
    color: "#006df4",
    opacity: 0.4,
  },
  tags: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginRight: -10,
  },
  itemTag: {
    fontSize: 12,
    lineHeight: 24,
    margin: 10,
    paddingLeft: 6,
    paddingRight: 6,
    color: "#08b09b",
    backgroundColor: "#fff",
    borderRadius: 3,
  },
  paginationRow: {
    flexDirection: "row",
  },
  paginationColumn: {
    width: "50%",
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  link: {
    color: "#006df4",
    fontSize: 18,
    padding: 20,
  },
});

export { ShowcaseList as Component };

export default withPhenomicApi(ShowcaseList, props => ({
  showcase: query({
    path: "content/showcase/entry",
    order: "asc",
    sort: "showcase",
    limit: 10,
    after: props.params.after,
  }),
}));

export const ShowcaseListByTag = withPhenomicApi(ShowcaseList, props => ({
  showcase: query({
    path: "content/showcase/entry",
    by: "showcaseTags",
    value: props.params.showcaseTags,
    order: "asc",
    sort: "showcase",
    limit: 10,
    after: props.params.after,
  }),
}));
