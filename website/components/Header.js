// @flow

import * as React from "react";
import { View, Text, StyleSheet } from "react-native-web";
import Head from "react-helmet";

import Spacer from "./Spacer";
import BodyContainer from "./BodyContainer";
import BackgroundGradient from "./BackgroundGradient";
import HeaderNavBar from "./HeaderNavBar";

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
      <Spacer large>
        <Text style={styles.heroText}>{props.title}</Text>
        <Text style={styles.heroSubText}>{props.subtitle}</Text>
      </Spacer>
      {props.children && <View style={styles.children}>{props.children}</View>}
    </BodyContainer>
  </BackgroundGradient>
);

const styles = StyleSheet.create({
  container: {
    overflow: "hidden"
  },
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
