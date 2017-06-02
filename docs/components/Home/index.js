import React from "react";
import { StyleSheet, Text, View } from "react-primitives";
import { createContainer } from "@phenomic/preset-react-app/lib/client";

import Header from "../Header";
import Footer from "../Footer";
import Flex from "../Flex";
import Spacer from "../Spacer";
import BodyContainer from "../BodyContainer";
import BackgroundGradient from "../BackgroundGradient";

import InputOutput from "./InputOutput";
import CodeExample from "./CodeExample";

const Home = () => (
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
        <BackgroundGradient start="#4100FE" end="#3BD9F0" style={styles.box}>
          <Text style={styles.boxTitle}>{"Write once, read everywere"}</Text>
          <Text style={styles.boxText}>
            {"No server runtime, no database, your pages are generated before"}
          </Text>
        </BackgroundGradient>
        <Spacer large />
        <BackgroundGradient start="#10E951" end="#006BF6" style={styles.box}>
          <Text style={styles.boxTitle}>{"Documents built as an app"}</Text>
          <Text style={styles.boxText}>
            {
              "Once a user has loaded their entry point, they only download the minimal set of data to get to the next page"
            }
          </Text>
        </BackgroundGradient>
        <Spacer large />
        <BackgroundGradient start="#006BF6" end="#46BCC5" style={styles.box}>
          <Text style={styles.boxTitle}>{"Offline capabilities"}</Text>
          <Text style={styles.boxText}>
            {
              "Phenomic conceptually separates your shell from your data. You can create an offline-first experience"
            }
          </Text>
        </BackgroundGradient>
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
        <BackgroundGradient start="#4100FE" end="#3BD9F0" style={styles.box}>
          <Text style={styles.boxTitle}>{"Small API surface"}</Text>
          <Text style={styles.boxText}>
            {"Phenomic has a very simple core."}
          </Text>
        </BackgroundGradient>
        <Spacer large />
        <BackgroundGradient start="#10E951" end="#006BF6" style={styles.box}>
          <Text style={styles.boxTitle}>{"Extenstible"}</Text>
          <Text style={styles.boxText}>
            {"You can write your own plugins to bring any feature, really!"}
          </Text>
        </BackgroundGradient>
        <Spacer large />
        <BackgroundGradient start="#006BF6" end="#46BCC5" style={styles.box}>
          <Text style={styles.boxTitle}>{"Hot reload"}</Text>
          <Text style={styles.boxText}>
            {
              "Your shell and your data can both refresh on the fly. No more ⌘ + R!"
            }
          </Text>
        </BackgroundGradient>
      </View>
    </BodyContainer>
    <Spacer large />
    <Footer />
  </Flex>
);

const styles = StyleSheet.create({
  top: {
    paddingBottom: 200
  },
  gettingStarted: {
    marginTop: -160
  },
  row: {
    flexDirection: "row"
  },
  box: {
    width: "33%",
    borderRadius: 6
  },
  boxTitle: {
    padding: 10,
    paddingBottom: 0,
    fontSize: 24,
    color: "#fff",
    textAlign: "center"
  },
  boxText: {
    color: "#fff",
    padding: 20,
    fontSize: 14
  }
});

export default createContainer(Home);
