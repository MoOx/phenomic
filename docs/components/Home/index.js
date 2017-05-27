import React from "react";
import { View } from "react-primitives";
import Head from "react-helmet";
import { createContainer } from "@phenomic/preset-react-app/lib/client";

import Header from "../Header";
import BackgroundGradient from "../BackgroundGradient";
import Hero from "../Hero";

const Home = () => (
  <View>
    <Head>
      <title>{"Phenomic, a modular static-site generator"}</title>
    </Head>
    <BackgroundGradient name="blueGreen">
      <Header />
      <Hero />
    </BackgroundGradient>
  </View>
);

export default createContainer(Home);
