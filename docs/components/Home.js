import React from "react";
import { View } from "react-native-web";
import Head from "react-helmet";
import { createContainer } from "@phenomic/preset-react-app/lib/client";

import Hero from "./Hero";

const Home = () => (
  <View>
    <Head>
      <title>{"Phenomic, a modular static-site generator"}</title>
    </Head>
    <Hero />
  </View>
);

export default createContainer(Home);
