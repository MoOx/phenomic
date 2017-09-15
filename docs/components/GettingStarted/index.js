import * as React from "react";
import { View, Text, StyleSheet } from "react-native-web";

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
      <View style={styles.row}>{"Start by choosing your ecosystem"}</View>
      <View style={styles.logos}>
        <Link
          style={styles.logo}
          href="https://github.com/phenomic/phenomic/blob/master/packages/preset-react-app/docs/getting-started/README.md"
        >
          <View style={styles.img}>
            <img src="/assets/react.svg" height="128" />
          </View>
          <Text style={styles.logoTitle}>{"React"}</Text>
        </Link>
        <Link
          style={styles.logo}
          href="https://github.com/phenomic/phenomic/tree/master/examples/reason-react-app/"
        >
          <View style={styles.img}>
            <img src="/assets/reason-react.svg" height="128" />
          </View>
          <Text style={styles.logoTitle}>{"ReasonReact"}</Text>
        </Link>
        <Link
          style={styles.logo}
          href="https://github.com/phenomic/phenomic/issues/1148"
        >
          <View style={[styles.img, styles.todo]}>
            <img src="/assets/preact.svg" height="128" />
          </View>
          <Text style={styles.logoTitle}>{"PREACT"}</Text>
        </Link>
        <Link
          style={styles.logo}
          href="https://github.com/phenomic/phenomic/issues/1149"
        >
          <View style={[styles.img, styles.todo]}>
            <img src="/assets/Next.js.svg" height="128" />
          </View>
          <Text style={styles.logoTitle}>{"Next.js"}</Text>
        </Link>
        <Link
          style={styles.logo}
          href="https://github.com/phenomic/phenomic/issues/1145"
        >
          <View style={[styles.img, styles.todo]}>
            <img src="/assets/vue.svg" height="96" />
          </View>
          <Text style={styles.logoTitle}>{"Vue"}</Text>
        </Link>
        <Link
          style={styles.logo}
          href="https://github.com/phenomic/phenomic/issues/1150"
        >
          <View style={[styles.img, styles.todo]}>
            <img src="/assets/angular.svg" height="128" />
          </View>
          <Text style={styles.logoTitle}>{"Angular"}</Text>
        </Link>
      </View>
      <View style={styles.row}>
        <Text style={styles.notice}>
          {
            "⚠️ Lots of plugins are to be done. Want to help us? Click on a blurry logo!"
          }
        </Text>
      </View>
    </BodyContainer>
    <Spacer large />
    <Footer />
  </Flex>
);

const styles = StyleSheet.create({
  page: {
    paddingTop: 48,
    paddingBottom: 48
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  logos: {
    marginTop: 48,
    marginBottom: 24,
    borderTopWidth: 1,
    borderTopColor: "#dfe7ed",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  logo: {
    borderBottomWidth: 1,
    borderBottomColor: "#dfe7ed",
    borderBottomStyle: "solid",
    flexGrow: 1,
    flexDirection: "column",
    paddingVertical: 48,
    width: "33%",
    // justifyContent: "center",
    alignItems: "center",
    color: "inherit",
    textDecorationStyle: "none"
  },
  logoTitle: {
    fontSize: 18,
    fontWeight: "300",
    color: "#4c4d63"
  },
  img: {
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    height: 128,
    marginBottom: 24
  },
  todo: {
    opacity: 0.25,
    filter: "blur(1px) grayscale(75%)"
  },
  notice: {
    opacity: 0.25,
    fontSize: 24,
    paddingVertical: 48
  }
});

export default GettingStarted;
