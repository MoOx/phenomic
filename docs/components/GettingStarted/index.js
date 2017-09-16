import * as React from "react";
import { View, Text, StyleSheet } from "react-native-web";

import Flex from "../Flex";
import Link from "../Link";
import Spacer from "../Spacer";
import Header from "../Header";
import Footer from "../Footer";
import BodyContainer from "../BodyContainer";

const items = [
  {
    title: "React",
    href:
      "https://github.com/phenomic/phenomic/blob/master/packages/preset-react-app/docs/getting-started/README.md",
    img: "/assets/react.svg"
  },
  {
    title: "ReasonReact",
    href:
      "https://github.com/phenomic/phenomic/tree/master/examples/reason-react-app/",
    img: "/assets/reason-react.svg"
  },
  {
    title: "PREACT",
    href: "https://github.com/phenomic/phenomic/issues/1148",
    img: "/assets/preact.svg",
    todo: true
  },
  {
    title: "Next.js",
    href: "https://github.com/phenomic/phenomic/issues/1149",
    img: "/assets/Next.js.svg",
    todo: true
  },
  {
    title: "Vue",
    href: "https://github.com/phenomic/phenomic/issues/1145",
    img: "/assets/vue.svg",
    todo: true,
    height: 96
  },
  {
    title: "Angular",
    href: "https://github.com/phenomic/phenomic/issues/1150",
    img: "/assets/angular.svg",
    todo: true
  }
];

// const split = (arr, n, res = []) => {
//   while (arr.length) res.push(arr.splice(0, n));
//   return res;
// }

const GettingStarted = () => (
  <Flex>
    <Header title={"Getting started with Phenomic"} />
    <BodyContainer style={styles.page}>
      <View style={styles.row}>{"Start by choosing your ecosystem"}</View>
      <View style={styles.logos}>
        {items.map((item, i) => (
          <Link.Block
            key={i}
            blockProps={{ style: styles.logoWrapper }}
            style={[styles.logo, item.todo && styles.todo]}
            href={item.href}
          >
            <View style={styles.img}>
              <img src={item.img} height={item.height || 128} />
            </View>
            <Text style={styles.logoTitle}>{item.title}</Text>
          </Link.Block>
        ))}
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
  logoWrapper: {
    width: "33%"
  },
  logo: {
    borderBottomWidth: 1,
    borderBottomColor: "#dfe7ed",
    borderBottomStyle: "solid",
    flexGrow: 1,
    flexDirection: "column",
    paddingVertical: 48,
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
    justifyContent: "center",
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
