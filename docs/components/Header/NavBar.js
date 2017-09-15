import * as React from "react";
import { View, Text, StyleSheet } from "react-native-web";

import Link from "../Link";
import Spacer from "../Spacer";
import { version } from "../../../lerna.json";

const HeaderNavBar = () => (
  <View style={styles.header}>
    <View style={styles.logo}>
      <Link to="/" style={styles.text}>
        <img src="/assets/phenomic-logo-baseline.svg" height="48" />
      </Link>
      <Spacer small />
      <Link
        href="https://github.com/phenomic/phenomic/releases"
        style={styles.version}
      >
        {"v" + version}
      </Link>
    </View>
    <View style={styles.nav}>
      <Link
        to="/docs/getting-started"
        style={styles.link}
        activeStyle={styles.linkActive}
      >
        <Text style={styles.linkText}>{"Getting started"}</Text>
      </Link>
      <Link to="/news" style={styles.link} activeStyle={styles.linkActive}>
        <Text style={[styles.linkText]}>{"News"}</Text>
      </Link>
      <Link to="/showcase" style={styles.link} activeStyle={styles.linkActive}>
        <Text style={[styles.linkText, styles.linkBold]}>{"Showcase"}</Text>
      </Link>
      <Text style={styles.pipe}>{" | "}</Text>
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
    paddingHorizontal: 20,
    paddingVertical: 10
  },
  logo: {
    flexDirection: "row",
    alignItems: "baseline",
    justifyContent: "center",
    paddingVertical: 10
  },
  text: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "700",
    textDecorationLine: "none"
  },
  version: {
    textDecorationLine: "none",
    color: "#fff",
    opacity: 0.2,
    fontSize: 12
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
    maxWidth: "100%",
    paddingVertical: 10
  },
  pipe: {
    color: "rgba(255, 255, 255, 0.5)"
  }
});

export default HeaderNavBar;
