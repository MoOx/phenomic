// @flow

import * as React from "react";
import { StyleSheet, View, Text } from "react-native-web";

import BodyContainer from "./BodyContainer";
import Header from "./Header";

const PageError = ({ error }: { error: Object }) => {
  const status = (error && error.status) || 404;
  const errorText =
    error && status !== 404 ? error.statusText : "Page not found";

  return (
    <View>
      <Header title={errorText} />
      <BodyContainer style={styles.container}>
        <Text style={styles.oops}>{"Oooops!"}</Text>
        <View style={styles.text}>
          <Text style={styles.title}>
            <strong>{status}</strong> {errorText}
          </Text>
          {status === 404 && (
            <View>
              <Text>
                {"It seems you found a broken link. "}
                {"Sorry about that. "}
                <br />
                {"Do not hesitate to report this page."}
              </Text>
            </View>
          )}
        </View>
      </BodyContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "50vh",
    padding: "1rem 0"
  },
  oops: {
    fontSize: "4rem",
    lineHeight: "4rem",
    color: "#ddd"
  },
  title: {
    margin: 60,
    fontSize: 24,
    lineHeight: 48,
    textAlign: "center"
  }
});
export default PageError;
