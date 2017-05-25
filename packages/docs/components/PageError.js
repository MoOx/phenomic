import React from "react";
import { View } from "react-native-web";
import Head from "react-helmet";

const PageError = ({ error }: { error: Object }) => {
  const status = (error && error.status) || 404;
  const message = error && status !== 404 ? error.statusText : "Page not found";

  return (
    <View>
      <Head><title>{message}</title></Head>
      <h1>{message}</h1>
    </View>
  );
};

export default PageError;
