import * as React from "react";
import { StyleSheet } from "react-native-web";

import BodyContainer from "../BodyContainer";
import BackgroundGradient from "../BackgroundGradient";

import FooterNavBar from "./NavBar";

const Footer = (props: Object) => (
  <BackgroundGradient style={props.style} start="#2A2A2A" end="#121212">
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
