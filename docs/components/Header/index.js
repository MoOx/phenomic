import React from "react";
import { View, Text, StyleSheet } from "react-primitives";

import Link from "../Link";

const Header = () => (
  <View style={styles.header}>
    <Link to="/" style={{ textDecoration: "none" }}>
      <Text style={styles.text}>
        {"Phenomic"}
      </Text>
    </Link>
    <View style={styles.nav}>
      <Link
        to="/docs/getting-started"
        style={styles.link}
        activeStyle={styles.linkActive}
      >
        <Text style={styles.linkText}>
          {"Getting started"}
        </Text>
      </Link>
      <Link
        to="/docs/usage/"
        style={styles.link}
        activeStyle={styles.linkActive}
      >
        <Text style={styles.linkText}>
          {"Usage"}
        </Text>
      </Link>
      <Link
        to="/docs/plugins"
        style={styles.link}
        activeStyle={styles.linkActive}
      >
        <Text style={styles.linkText}>
          {"Plugins"}
        </Text>
      </Link>
      <Link to="/showcase" style={styles.link} activeStyle={styles.linkActive}>
        <Text style={[styles.linkText, styles.linkBold]}>
          {"Showcase"}
        </Text>
      </Link>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    height: 80,
    paddingLeft: 10,
    paddingRight: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap"
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700"
  },
  link: {
    textDecorationLine: "none",
    padding: 10
  },
  linkActive: {
    backgroundColor: "rgba(0, 0, 0, 0.1)"
  },
  linkText: {
    color: "#fff"
  },
  linkBold: {
    fontWeight: "700"
  },
  nav: {
    flexDirection: "row",
    alignItems: "center"
  }
});

export default Header;
