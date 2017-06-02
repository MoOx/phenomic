import React from "react";
import { StyleSheet, Text } from "react-primitives";
import { createContainer } from "@phenomic/preset-react-app/lib/client";

import Flex from "../Flex";
import BodyContainer from "../BodyContainer";
import Header from "../Header";
import Footer from "../Footer";
import Spacer from "../Spacer";

import InputOutput from "./InputOutput";
import CodeExample from "./CodeExample";

const Home = () => (
  <Flex>
    <Header
      headTitle={"Phenomic, a modular static-site generator"}
      title={"Modular website compiler"}
      style={styles.top}
    />
    <BodyContainer style={styles.gettingStarted}>
      <InputOutput />
      <Spacer />
      <Text
        style={{
          color: "#6B6B6B",
          fontSize: 36,
          textAlign: "center",
          padding: 60
        }}
      >
        {"Phenomic compiles your website to make it as fast as possible"}
      </Text>
      <Spacer />
      <CodeExample />
    </BodyContainer>
    <Spacer large />
    <Footer />
  </Flex>
);

const styles = StyleSheet.create({
  top: {
    paddingBottom: 120
  },
  gettingStarted: {
    marginTop: -100
  }
});

export default createContainer(Home);
