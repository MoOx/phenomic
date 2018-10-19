// @flow

import * as React from "react";
import { View, Text, StyleSheet, createElement } from "react-native-web";
import Head from "react-helmet";

import Spacer from "./Spacer";
import BodyContainer from "./BodyContainer";
import BackgroundGradient from "./BackgroundGradient";
import HeaderNavBar from "./HeaderNavBar";

/* eslint-disable react/no-multi-comp */

const Heading = p => createElement("h1", p);

const Header = (props: Object) => (
  <BackgroundGradient
    style={[styles.container, props.style]}
    start="#006BF6"
    end="#10E951"
    direction="135deg"
  >
    <HeaderNavBar />
    <BodyContainer style={styles.hero}>
      <Head>
        <title>{props.headTitle || props.title}</title>
      </Head>
      {/* @todo h1 or shit */}
      <Spacer large={true}>
        <Heading style={styles.heroText}>{props.title}</Heading>
        <Text style={styles.heroSubText}>{props.subtitle}</Text>
      </Spacer>
      {props.children && <View style={styles.children}>{props.children}</View>}
    </BodyContainer>
  </BackgroundGradient>
);

const styles = StyleSheet.create({
  container: {
    zIndex: 1 /* for DocSearch component autocomplete results */
  },
  hero: {
    paddingTop: 40,
    paddingBottom: 60
  },
  heroText: {
    color: "#fff",
    fontSize: 48,
    fontWeight: "200",
    textAlign: "center",
    margin: 0,
    padding: 0
  },
  heroSubText: {
    color: "#fff",
    opacity: 0.6,
    fontSize: 20,
    fontWeight: "300",
    textAlign: "center"
  },
  children: {}
});

export default Header;
