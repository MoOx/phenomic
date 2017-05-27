import React from "react";
import { View } from "react-primitives";
import Head from "react-helmet";

const Wrapper = (props: Object) => (
  <View>
    <Head>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <View>
      {props.children}
    </View>
  </View>
);

export default Wrapper;
