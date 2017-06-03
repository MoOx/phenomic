import React from "react";
import { View, Text, StyleSheet } from "react-primitives";

import Flex from "../Flex";
import Link from "../Link";
import Spacer from "../Spacer";
import Header from "../Header";
import Footer from "../Footer";
import BodyContainer from "../BodyContainer";

const GettingStarted = () => (
  <Flex>
    <Header title={"Getting started with Phenomic"} />
    <BodyContainer style={styles.page}>
      <View style={styles.row}>
        {"Start by choosing your ecosystem"}
      </View>
      <View style={styles.logos}>
        <Link
          style={styles.logo}
          href="https://github.com/phenomic/phenomic/blob/master/packages/preset-react-app/docs/getting-started/README.md"
        >
          <View style={styles.img}>
            <img src="/assets/react.svg" width="128" />
          </View>
        </Link>
        <View style={[styles.logo, styles.disabled]}>
          <View style={styles.img}>
            <img src="/assets/angular.svg" width="128" />
          </View>
          <Text>{"@todo"}</Text>
        </View>
        <View style={[styles.logo, styles.disabled]}>
          <View style={styles.img}>
            <img src="/assets/vue.svg" width="128" />
          </View>
          <Text>{"@todo"}</Text>
        </View>
      </View>
      <View style={styles.row}>
        <Text>{"Only React is ready yet. "}</Text>
        <Link
          style={styles.link}
          href="https://github.com/phenomic/phenomic/issues/new"
        >
          {"Want to help us?"}
        </Link>
      </View>
    </BodyContainer>
    <Spacer large />
    <Footer />
  </Flex>
);

const styles = StyleSheet.create({
  page: {
    paddingTop: 20,
    paddingBottom: 20
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  logos: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 20
  },
  logo: {
    padding: 20,
    width: "30%"
  },
  img: {
    // width: "25%",
    justifyContent: "center",
    alignItems: "center"
  },
  disabled: {
    opacity: 0.15,
    justifyContent: "center",
    alignItems: "center",
    filter: "blur(1px) grayscale(100%)"
  },
  link: {
    color: "inherit"
  }
});

export default GettingStarted;
