// @flow

import * as React from "react";
import { View, Text, StyleSheet } from "react-native-web";

import Link from "./Link";
import Spacer from "./Spacer";

const HeaderNavBar = () => (
  <View style={styles.container}>
    <View style={styles.col}>
      <Link.Touchable href="/" style={styles.text}>
        <img src="/assets/phenomic-logo-baseline.svg" height="48" />
      </Link.Touchable>
      <Spacer small />
    </View>
    <View style={styles.col}>
      <Link.Touchable
        href="/en/packages/core/docs/"
        style={styles.link}
        activeStyle={styles.linkActive}
      >
        <Text style={styles.linkText}>{"Docs"}</Text>
      </Link.Touchable>
      <Link.Touchable
        href="/en/tutorials/"
        style={styles.link}
        activeStyle={styles.linkActive}
      >
        <Text style={styles.linkText}>{"Tutorials"}</Text>
      </Link.Touchable>
      <Link.Touchable
        href="/en/plugins/"
        style={styles.link}
        activeStyle={styles.linkActive}
      >
        <Text style={styles.linkText}>{"Plugins"}</Text>
      </Link.Touchable>
      <Link.Touchable
        href="/en/blog/"
        style={styles.link}
        activeStyle={styles.linkActive}
      >
        <Text style={styles.linkText}>{"Blog"}</Text>
      </Link.Touchable>
      <Link.Touchable
        href="/en/showcase/"
        style={styles.link}
        activeStyle={styles.linkActive}
      >
        <Text style={[styles.linkText, styles.linkBold]}>{"Showcase"}</Text>
      </Link.Touchable>
    </View>
    <View style={styles.col}>
      <Link.Touchable
        href="https://github.com/phenomic/phenomic"
        style={styles.link}
      >
        <Text style={styles.linkText}>{"GitHub"}</Text>
      </Link.Touchable>
      <Link.Touchable
        href="https://twitter.com/Phenomic_app"
        style={styles.link}
      >
        <Text style={styles.linkText}>{"Twitter"}</Text>
      </Link.Touchable>
      <Link.Touchable href="https://spectrum.chat/phenomic" style={styles.link}>
        <Text style={styles.linkText}>{"Community"}</Text>
      </Link.Touchable>
      <Link.Touchable
        href="https://gitter.im/MoOx/phenomic"
        style={styles.link}
      >
        <Text style={styles.linkText}>{"Chat"}</Text>
      </Link.Touchable>
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    paddingLeft: 20,
    paddingRight: 20
  },
  col: {
    flex: 1,
    alignItems: "flex-start"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
    textDecorationLine: "none"
  },
  link: {
    textDecorationLine: "none",
    padding: 10
  },
  linkActive: {
    backgroundColor: "rgba(255,255,255, 0.1)"
  },
  linkText: {
    color: "#fff"
  },
  linkBold: {
    fontWeight: "700"
  }
});

export default HeaderNavBar;
