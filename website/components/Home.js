// @flow

import * as React from "react";
import Head from "react-helmet";
import { StyleSheet, Text, View } from "react-native-web";
import { withPhenomicApi } from "@phenomic/preset-react-app/lib/client";

import BackgroundGradient from "./BackgroundGradient";
import HeaderNavBar from "./HeaderNavBar";
import Footer from "./Footer";
import Flex from "./Flex";
import Spacer from "./Spacer";
import BodyContainer from "./BodyContainer";
import Link from "./Link";
import FeatureBlock from "./HomeFeatureBlock";
import InputOutput from "./HomeInputOutput";
import CodeExample from "./HomeCodeExample";

const Home = () => (
  <Flex style={{ overflow: "hidden" }}>
    <View style={styles.heroContainer} start="#006BF6" end="#10E951">
      <BackgroundGradient
        style={styles.heroGradient}
        start="#006BF6"
        end="#10E951"
      >
        {global.window && (
          <img
            src="/assets/phenomic-logo-white.svg"
            height={Math.max(window.innerWidth, window.innerHeight) * 0.75}
            style={{
              opacity: 0.06,
              position: "absolute",
              top: window.innerHeight * 0.2,
              right: window.innerWidth * 0.1,
              transform: [{ rotate: "6deg" }]
            }}
          />
        )}
      </BackgroundGradient>
      <Head>
        <title>
          {"Phenomic, a modular website compiler (static site generator)"}
        </title>
      </Head>
      <HeaderNavBar />
      <BodyContainer style={styles.hero}>
        {/* @todo h1 or shit */}
        <View style={styles.row}>
          <Spacer large>
            <img
              src="/assets/phenomic-text.svg"
              style={{ maxHeight: "72px" }}
            />
          </Spacer>
        </View>
        <Text style={styles.heroSubtitleText}>
          {"Meet the modular website compiler"}
        </Text>
      </BodyContainer>
    </View>
    <BodyContainer style={styles.gettingStarted}>
      <Link.Block href="/docs/getting-started">
        <InputOutput />
      </Link.Block>
      <Spacer />
      <Spacer />
      <Text style={styles.subtitle}>
        <Link.Touchable href="/docs/getting-started">
          {"Build your website and make it as fast as possible"}
        </Link.Touchable>
      </Text>
      <Spacer />
      <View style={[styles.row, { maxWidth: 900, marginHorizontal: "auto" }]}>
        <Spacer style={styles.box}>
          <FeatureBlock
            start="#4F3CF5"
            end="#5896F8"
            title={"Write once, read everywhere"}
            description={
              "No server runtime, no database. Your pages are generated before users access your website."
            }
          />
        </Spacer>
        <Spacer style={styles.box}>
          <FeatureBlock
            start="#4657F6"
            end="#5BC1FA"
            title={"Documents built as an app"}
            description={
              "Once a user loaded their first page, they only download the minimal data for next pages."
            }
          />
        </Spacer>
        <Spacer style={styles.box}>
          <FeatureBlock
            start="#59ADF9"
            end="#66DAF2"
            title={"Offline capabilities"}
            description={
              "Phenomic conceptually separates your shell from your data. You can create an offline-first experience."
            }
          />
        </Spacer>
      </View>
      <Spacer />
      <Text style={styles.subtitle}>
        <Link.Touchable href="/docs/getting-started">
          {"Get running in seconds"}
        </Link.Touchable>
      </Text>
      <CodeExample />
      <Spacer />
      <Text style={styles.subtitle}>
        <Link.Touchable href="/docs/getting-started">
          {"Get the best developer experience"}
        </Link.Touchable>
      </Text>
      <Spacer />
      <View style={[styles.row, { maxWidth: 900, marginHorizontal: "auto" }]}>
        <Spacer style={styles.box}>
          <FeatureBlock
            start="#3E73DF"
            end="#4EA4C6"
            title={"Small API surface"}
            description={
              "Phenomic has a very simple core that fits on a screen."
            }
          />
        </Spacer>
        <Spacer style={styles.box}>
          <FeatureBlock
            start="#4998CD"
            end="#78D5B3"
            title={"Extensible"}
            description={"You can write plugins to bring any feature you want."}
          />
        </Spacer>
        <Spacer style={styles.box}>
          <FeatureBlock
            start="#55B9BC"
            end="#C2F4AE"
            title={"Hot reload"}
            description={
              <React.Fragment>
                <Text>
                  {"Your shell and your data can both refresh on the fly."}
                </Text>
                <br />
                <Text style={styles.strong}>{"No more ⌘ + R!"}</Text>
              </React.Fragment>
            }
          />
        </Spacer>
      </View>
    </BodyContainer>
    <Spacer large />
    <Footer />
  </Flex>
);

const styles = StyleSheet.create({
  heroContainer: {},
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
    top: -100,
    zIndex: 0,
    minWidth: "120vh",
    maxWidth: "120%",
    transform: [{ rotate: "-6deg" }, { scale: 1.2 }]
  },
  hero: {
    paddingTop: 40,
    paddingBottom: 400
  },
  heroSubtitleText: {
    fontSize: 22,
    fontWeight: "300",
    paddingVertical: 20,
    color: "#fff",
    textAlign: "center",
    opacity: 0.6
  },
  gettingStarted: {
    marginTop: -300
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center"
  },
  box: {
    maxWidth: 400,
    minWidth: 240,
    flexShrink: 1
  },
  subtitle: {
    color: "#9DA9B9",
    fontSize: 48,
    fontWeight: "300",
    textAlign: "center",
    paddingHorizontal: Spacer.normal,
    paddingVertical: Spacer.large * 2
  },
  strong: {
    fontWeight: "800"
  }
});

export default withPhenomicApi(Home);
