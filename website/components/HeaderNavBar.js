// @flow

import * as React from "react";
import { View, Text, StyleSheet } from "react-native-web";

import IconWrench from "../svgs/IconWrench";
import IconTools from "../svgs/IconTools";
import Github from "../svgs/Github";
import Twitter from "../svgs/Twitter";
import Spectrum from "../svgs/Spectrum";
import Gitter from "../svgs/Gitter";

import PhenomicLogo from "./PhenomicLogo";
import DocSearch from "./DocSearch";
import Link from "./Link";
import Spacer from "./Spacer";

const HeaderNavBar = () => (
  <React.Fragment>
    <View style={[styles.rowFlex, styles.wip]}>
      <Spacer small={true}>
        <Text style={styles.wipText}>
          <IconWrench height="16" fill="#041d0f" style={{ margin: "0 10px" }} />
          {" This website is a work in progress. "}
          <IconTools height="16" fill="#041d0f" style={{ margin: "0 10px" }} />
        </Text>
      </Spacer>
    </View>
    <View style={[styles.rowFlex, styles.header]}>
      <View style={[styles.rowFlex, styles.left]}>
        <PhenomicLogo />
        <Spacer small={true} style={[styles.rowFlex, styles.menu]}>
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
        </Spacer>
      </View>
      <View style={[styles.rowFlex, styles.right]}>
        <Spacer small={true} style={[styles.row, styles.search]}>
          <DocSearch />
        </Spacer>
        <Spacer small={true} style={[styles.rowFlex, styles.social]}>
          <Link.Touchable
            href="https://github.com/phenomic/phenomic"
            style={[styles.link, styles.linkIcon]}
            title={"GitHub"}
          >
            <Github height={iconSize} fill="#fff" />
            <Text style={styles.linkIconText}>{"GitHub"}</Text>
          </Link.Touchable>
          <Link.Touchable
            href="https://twitter.com/Phenomic_app"
            style={[styles.link, styles.linkIcon]}
            title={"Twitter"}
          >
            <Twitter height={iconSize} fill="#fff" />
            <Text style={styles.linkIconText}>{"Twitter"}</Text>
          </Link.Touchable>
          <Link.Touchable
            href="https://spectrum.chat/phenomic"
            style={[styles.link, styles.linkIcon]}
            title={"Community"}
          >
            <Spectrum height={iconSize} fill="#fff" />
            <Text style={styles.linkIconText}>{"Spectrum"}</Text>
          </Link.Touchable>
          <Link.Touchable
            href="https://gitter.im/MoOx/phenomic"
            style={[styles.link, styles.linkIcon]}
            title={"Chat"}
          >
            <Gitter height={iconSize} fill="#fff" />
            <Text style={styles.linkIconText}>{"Gitter"}</Text>
          </Link.Touchable>
        </Spacer>
      </View>
    </View>
  </React.Fragment>
);

const iconSize = 24;
const styles = StyleSheet.create({
  rowFlex: {
    // flexShrink: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
  },
  wip: {
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  wipText: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "center",
    color: "#041d0f",
    fontWeight: "100",
  },
  header: {
    zIndex: 1 /* for DocSearch component autocomplete results */,
    flexWrap: "wrap",
    justifyContent: "space-between",
    alignItems: "flex-start",
    backgroundColor: "rgba(0,0,0,0.25)",
  },
  left: {
    flex: 1,
    // minWidth: 500,
    flexBasis: 500,
  },
  right: {
    flex: 1,
    // minWidth: 350,
    flexBasis: 350,
    justifyContent: "flex-end",
  },
  menu: {
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  search: {
    flex: 1,
  },
  social: {
    flexGrow: 1,
    // flex: 1,
    flexShrink: 0,
    justifyContent: "flex-end",
  },
  link: {
    textDecorationLine: "none",
    paddingVertical: Spacer.small,
    paddingHorizontal: Spacer.small,
  },
  linkIcon: {
    display: "flex",
    flexDirection: "column",
    paddingVertical: 8,
  },
  linkActive: {
    backgroundColor: "rgba(0, 0, 0, 0.1)",
  },
  linkText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "300",
  },
  linkIconText: {
    color: "#fff",
    paddingTop: 2,
    fontSize: 8,
    fontWeight: "200",
  },
});

export default HeaderNavBar;
