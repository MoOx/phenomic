import React from "react";
import { View, Text, StyleSheet } from "react-primitives";
import Head from "react-helmet";

import BodyContainer from "../BodyContainer";
import BackgroundGradient from "../BackgroundGradient";

import HeaderNavBar from "./NavBar";

const Header = (props: Object) => (
  <BackgroundGradient style={props.style} start="#006BF6" end="#10E951">
    <HeaderNavBar />
    <BodyContainer style={styles.hero}>
      <Head><title>{props.headTitle || props.title}</title></Head>
      {/* @todo h1 or shit */}
      <Text style={styles.heroText}>{props.title}</Text>
      {props.children && <View style={styles.children}>{props.children}</View>}
    </BodyContainer>
  </BackgroundGradient>
);

const styles = StyleSheet.create({
  hero: {
    paddingTop: 40,
    paddingBottom: 60
  },
  heroText: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "200",
    textAlign: "center"
  },
  children: {}
});

export default Header;
