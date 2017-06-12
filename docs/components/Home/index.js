import React from "react";
import { StyleSheet, Text, View } from "react-primitives";
import { createContainer } from "@phenomic/preset-react-app/lib/client";

import Header from "../Header";
import Footer from "../Footer";
import Flex from "../Flex";
import Spacer from "../Spacer";
import BodyContainer from "../BodyContainer";
import BackgroundGradient from "../BackgroundGradient";
import FeatureBlock from "./FeatureBlock";

import InputOutput from "./InputOutput";
import CodeExample from "./CodeExample";

const Home = () =>
  <Flex>
    <Header
      headTitle={"Phenomic, a modular website compiler (static site generator)"}
      title={"Phenomic is a website compiler"}
      style={styles.top}
    />
    <BodyContainer style={styles.gettingStarted}>
      <InputOutput />
      <Spacer />
      <Text
        // eslint-disable-next-line
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
      <View style={styles.row}>
        <View style={styles.box}>
          <FeatureBlock
            start="#3023AE"
            end="#C96DD8"
            title={"Write once, read everywere"}
            description={
              "No server runtime, no database, your pages are generated before"
            }
          />
        </View>
        <Spacer large />
        <View style={styles.box}>
          <FeatureBlock
            start="#4100FE"
            end="#3BD9F0"
            title={"Documents built as an app"}
            description={
              "Once a user has loaded their entry point, they only download the minimal set of data to get to the next page"
            }
          />
        </View>
        <Spacer large />
        <View style={styles.box}>
          <FeatureBlock
            start="#AE8023"
            end="#FFF506"
            title={"Offline capabilities"}
            description={
              "Phenomic conceptually separates your shell from your data. You can create an offline-first experience"
            }
          />
        </View>
      </View>
      <Spacer />
      <Text
        // eslint-disable-next-line
        style={{
          color: "#6B6B6B",
          fontSize: 36,
          textAlign: "center",
          padding: 60
        }}
      >
        {"Get running in seconds"}
      </Text>
      <CodeExample />
      <Spacer />
      <Text
        // eslint-disable-next-line
        style={{
          color: "#6B6B6B",
          fontSize: 36,
          textAlign: "center",
          padding: 60
        }}
      >
        {"Developers experience matters"}
      </Text>
      <Spacer />
      <View style={styles.row}>
        <View style={styles.box}>
          <FeatureBlock
            start="#B4ED50"
            end="#429321"
            title={"Small API surface"}
            description={"Phenomic has a very simple core."}
          />
        </View>

        <Spacer large />
        <View style={styles.box}>
          <FeatureBlock
            start="#03689F"
            end="#51F5F2"
            title={"Extensible"}
            description={
              "You can write your own plugins to bring any feature, really!"
            }
          />
        </View>
        <Spacer large />
        <View style={styles.box}>
          <FeatureBlock
            start="#9F031B"
            end="#F5515F"
            title={"Hot reload"}
            description={
              "Your shell and your data can both refresh on the fly. No more ⌘ + R!"
            }
          />
        </View>

      </View>
    </BodyContainer>
    <Spacer large />
    <Footer />
  </Flex>;

const styles = StyleSheet.create({
  top: {
    paddingBottom: 200
  },
  gettingStarted: {
    marginTop: -160
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap"
  },
  box: {
    width: 272,
    flexShrink: 1,
    minWidth: 240,
    paddingVertical: 10
  }
});

export default createContainer(Home);
