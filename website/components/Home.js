// @flow

import * as React from "react";
import Head from "react-helmet";
import { StyleSheet, Text, View } from "react-native-web";
import { withPhenomicApi } from "@phenomic/preset-react-app/lib/client";

import PhenomicLogoWhite from "../svgs/PhenomicLogoWhite";
import PhenomicText from "../svgs/PhenomicText";

import BackgroundGradient from "./BackgroundGradient";
import HeaderNavBar from "./HeaderNavBar";
import Footer from "./Footer";
import Flex from "./Flex";
import Spacer from "./Spacer";
import BodyContainer from "./BodyContainer";

const Home = () => (
  <Flex style={{ overflow: "hidden" }}>
    <View style={styles.heroContainer}>
      <BackgroundGradient
        style={styles.heroGradient}
        start="#006BF6"
        end="#10E951"
        direction="135deg"
      >
        {/* <ImageBackground
        style={styles.heroGradient}
        source={{ uri: "/bg/jack-cain-326608-unsplash-.jpg" }}
      > */}
        {global.window && (
          <PhenomicLogoWhite
            height={Math.max(window.innerWidth, window.innerHeight) * 0.75}
            style={{
              opacity: 0.06,
              position: "absolute",
              top: window.innerHeight * 0.2,
              right: window.innerWidth * 0.1,
              transform: [{ rotate: "20deg" }],
            }}
          />
        )}
      </BackgroundGradient>
      {/* </ImageBackground> */}
      <Head>
        <title>
          {"Phenomic, a modular website compiler (static site generator)"}
        </title>
      </Head>
      <HeaderNavBar />
      <BodyContainer style={styles.hero}>
        {/* @todo h1 or shit */}
        <View style={styles.row}>
          <Spacer large={true}>
            <PhenomicText style={{ maxHeight: "72px" }} />
          </Spacer>
        </View>
        <Text style={styles.heroSubtitleText}>
          {"Meet the modular website compiler"}
        </Text>
      </BodyContainer>
    </View>
    <BodyContainer style={styles.gettingStarted}>
      <Text />
      <Spacer large={true} style={styles.block}>
        <Text style={styles.blockTitle}>
          {"A static site generator like no other"}
        </Text>
        <Text style={styles.blockText}>
          {`Phenomic is a modular website compiler that helps you to build static websites, with a modern approach: you will make your website the same way you build an app.`}
        </Text>
      </Spacer>
      <Spacer large={true} style={styles.block}>
        <Text style={styles.blockTitle}>
          {"A website built with things you like"}
        </Text>
        <Text style={styles.blockText}>
          {`Phenomic is different from other SSG by allowing you to pick the technologies, libraries, frameworks of your choice and build your website with it. You can decide the renderer you want to use (like React), your bundler (like Webpack) and so on. If the solution you are looking for is not implemented yet, Phenomic accepts plugins so you can bring your own flavor!.`}
          {/* <Text style={styles.button>{"Choose your flavor"}</Text> */}
        </Text>
      </Spacer>
      <Spacer large={true} style={styles.block}>
        <Text style={styles.blockTitle}>
          {"A static website, 100% SEO friendly"}
        </Text>
        <Text style={styles.blockText}>
          {`When development is done, Phenomic will help you to produce for you static files that you can deploy on any static hosting (HTML, CSS and JavaScript files). The result will be an SEO friendly website (all pages built and can be served as HTML files) and optimised for fast browsing (after the first HTML page, JavaScript files will handle client side navigation and only download what is necessary without full pages reload).`}
          {/* <Text style={styles.button>{"Tell me more about SEO"}</Text> */}
        </Text>
      </Spacer>
      <Spacer large={true} style={styles.block}>
        <Text style={styles.blockTitle}>
          {"A website with lightning fast UX"}
        </Text>
        <Text style={styles.blockText}>
          {`This way you offer the best user experience by immediately serving pre-generated HTML for first visits (or all pages, for search engine bots and browsers that don't interpret JavaScript) and then using the power of JavaScript to avoid full page reloads by only downloading small chunks of data for each page & interaction.`}
          {/* <Text style={styles.button>{"Get started"}</Text> */}
        </Text>
      </Spacer>
      <Spacer large={true} style={styles.block}>
        <Text style={styles.blockTitle}>{"Phenomic ♥️ JAMStack"}</Text>
        <Text style={styles.blockText}>
          {`Phenomic completely embraces the JAMStack way of building websites and apps that delivers better performance, higher security, lower cost of scaling, and a better developer experience.`}
          {/* <Text style={styles.button>{"More about deployment"}</Text> */}
        </Text>
      </Spacer>
    </BodyContainer>
    <Spacer large={true} />
    <Footer />
  </Flex>
);

const styles = StyleSheet.create({
  heroContainer: {
    zIndex: 1 /* for DocSearch component autocomplete results */,
    marginBottom: Spacer.large * 3,
  },
  heroGradient: {
    ...StyleSheet.absoluteFillObject,
    overflow: "hidden",
    top: -100,
    zIndex: 0,
    minWidth: "120vh",
    maxWidth: "120%",
    transform: [{ rotate: "-5deg" }, { scale: 1.2 }],
  },
  hero: {
    paddingTop: Spacer.large,
  },
  heroSubtitleText: {
    fontSize: 22,
    fontWeight: "300",
    paddingVertical: 20,
    color: "#fff",
    textAlign: "center",
    opacity: 0.6,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  block: {},
  blockTitle: {
    fontSize: 48,
    color: "#4A90E2",
    fontWeight: "200",
  },
  blockText: {
    paddingVertical: Spacer.large,
    fontSize: 22,
    lineHeight: 33,
    fontWeight: "300",
  },
});

export default withPhenomicApi(Home);
