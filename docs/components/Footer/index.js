import React from "react";
import { View, Text, StyleSheet } from "react-primitives";

import BodyContainer from "../BodyContainer";
import BackgroundGradient from "../BackgroundGradient";

import FooterNavBar from "./NavBar";

const Footer = (props: Object) => (
  <BackgroundGradient name="darkGrey" style={props.style}>
    <BodyContainer style={styles.hero}>
      <FooterNavBar />
    </BodyContainer>
  </BackgroundGradient>
);

const styles = StyleSheet.create({
  hero: {
    paddingTop: 40,
    paddingBottom: 60
  }
});

export default Footer;
