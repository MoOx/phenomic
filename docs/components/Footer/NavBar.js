import * as React from "react";
import { View, Text, StyleSheet } from "react-native-web";

import Link from "../Link";
import Spacer from "../Spacer";

const HeaderNavBar = () => (
  <View style={styles.header}>
    <View style={styles.row}>
      <Link to="/" style={styles.text}>
        <img src="/assets/phenomic-logo-baseline.svg" height="48" />
      </Link>
      <Spacer small />
    </View>
    <View style={styles.nav}>
      <Link
        to="/docs/getting-started"
        style={styles.link}
        activeStyle={styles.linkActive}
      >
        <Text style={styles.linkText}>{"Getting started"}</Text>
      </Link>
      <Link to="/showcase" style={styles.link} activeStyle={styles.linkActive}>
        <Text style={[styles.linkText, styles.linkBold]}>{"Showcase"}</Text>
      </Link>
      <Text>{" | "}</Text>
      <Link href="https://github.com/phenomic/phenomic" style={styles.link}>
        <Text style={styles.linkText}>{"GitHub"}</Text>
      </Link>
      <Link href="https://twitter.com/Phenomic_app" style={styles.link}>
        <Text style={styles.linkText}>{"Twitter"}</Text>
      </Link>
      <Link href="https://gitter.im/MoOx/phenomic" style={styles.link}>
        <Text style={styles.linkText}>{"Chat"}</Text>
      </Link>
    </View>
  </View>
);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    height: 80,
    paddingLeft: 20,
    paddingRight: 20
  },
  row: {
    flexDirection: "row",
    alignItems: "baseline",
    maxWidth: "100%"
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
    alignItems: "center",
    flexWrap: "wrap",
    maxWidth: "100%"
  }
});

export default HeaderNavBar;
