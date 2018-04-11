import * as React from "react";
import { View, Text, StyleSheet } from "react-native-web";

import { version } from "../.././lerna.json";

import Link from "./Link";
import Spacer from "./Spacer";

const HeaderNavBar = () => (
  <Spacer small style={[styles.row, styles.header]}>
    <Spacer small style={[styles.row, styles.logo]}>
      <Link.Touchable href="/">
        <Spacer small style={{ flex: 0 }}>
          <img src="/assets/phenomic-logo-white.svg" height="42" />
        </Spacer>
      </Link.Touchable>
      <View>
        <Link.Touchable href="/">
          <Spacer small>
            <img src="/assets/phenomic-text.svg" height="18" />
          </Spacer>
        </Link.Touchable>
        <Link.Touchable
          href="https://github.com/phenomic/phenomic/releases"
          style={styles.version}
        >
          <Spacer small>
            <Text>{"v" + version}</Text>
          </Spacer>
        </Link.Touchable>
      </View>
    </Spacer>
    <Spacer small style={styles.nav}>
      <View style={styles.row}>
        <Link.Touchable
          href="/docs/getting-started"
          style={styles.link}
          activeStyle={styles.linkActive}
        >
          <Text style={styles.linkText}>{"Getting started"}</Text>
        </Link.Touchable>
        <Link.Touchable
          href="/blog"
          style={styles.link}
          activeStyle={styles.linkActive}
        >
          <Text style={[styles.linkText]}>{"Blog"}</Text>
        </Link.Touchable>
        <Link.Touchable
          href="/showcase"
          style={styles.link}
          activeStyle={styles.linkActive}
        >
          <Text style={[styles.linkText, styles.linkBold]}>{"Showcase"}</Text>
        </Link.Touchable>
      </View>
      <View style={styles.row}>
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
        <Link.Touchable
          href="https://spectrum.chat/phenomic"
          style={styles.link}
        >
          <Text style={styles.linkText}>{"Community"}</Text>
        </Link.Touchable>
        <Link.Touchable
          href="https://gitter.im/MoOx/phenomic"
          style={styles.link}
        >
          <Text style={styles.linkText}>{"Chat"}</Text>
        </Link.Touchable>
      </View>
    </Spacer>
  </Spacer>
);

const styles = StyleSheet.create({
  row: {
    flexShrink: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center"
  },
  header: {
    // flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  logo: {
    maxHeight: 42 + Spacer.small,
    overflow: "hidden"
  },
  version: {
    position: "absolute",
    bottom: -Spacer.normal,
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
    flexGrow: 4.5,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    flexWrap: "wrap"
  }
});

export default HeaderNavBar;
