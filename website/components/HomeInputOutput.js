import * as React from "react";
import { StyleSheet, View, Text } from "react-native-web";

/* eslint-disable react-native/no-inline-styles */

import Spinner from "./Spinner";
import Flex from "./Flex";
import Browser from "./Browser";
import Spacer from "./Spacer";

const InputOutput = () => (
  <View style={styles.row}>
    <Flex style={{ width: 250 }}>
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          padding: 20,
          fontSize: 16
        }}
      >
        {"Choose your favorite technologies"}
      </Text>
      <View
        style={[
          {
            backgroundColor: "#12171C",
            padding: Spacer.default,
            borderRadius: 6
          },
          styles.shadow
        ]}
      >
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              padding: 15,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              backgroundColor: "#f7df1e"
            }}
          >
            <img src="/assets/javascript.svg" width="64" />
          </View>
          <Spacer />
          <View
            style={{
              padding: 15,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              backgroundColor: "#fff"
            }}
          >
            <img src="/assets/babel.svg" width="64" />
          </View>
          <Spacer />
          <View
            style={{
              padding: 15,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              backgroundColor: "#DD4B39"
            }}
          >
            <img src="/assets/reason-square.svg" width="64" />
          </View>
        </View>
        <Spacer />
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              padding: 15,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              backgroundColor: "#fff"
            }}
          >
            <img src="/assets/preact.svg" width="64" />
          </View>
          <Spacer />
          <View
            style={{
              padding: 15,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              backgroundColor: "#292C33"
            }}
          >
            <img src="/assets/react.svg" width="64" />
          </View>
          <Spacer />
          <View
            style={{
              padding: 15,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              backgroundColor: "#fff"
            }}
          >
            <img src="/assets/vue.svg" width="64" />
          </View>
        </View>
        <Spacer />
        <View style={{ flexDirection: "row" }}>
          <View
            style={{
              padding: 15,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              backgroundColor: "#3F464E"
            }}
          >
            <img src="/assets/graphql.svg" width="64" />
          </View>
          <Spacer />
          <View
            style={{
              padding: 15,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              backgroundColor: "#fff"
            }}
          >
            <img src="/assets/markdown.svg" width="64" />
          </View>
          <Spacer />
          <View
            style={{
              padding: 15,
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              backgroundColor: "#1A62B2"
            }}
          >
            <img src="/assets/webpack.svg" width="64" />
          </View>
        </View>
      </View>
    </Flex>
    <Flex style={{ justifyContent: "center", alignItems: "center" }}>
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          padding: 20,
          fontSize: 16
        }}
      >
        {"Build your app"}
      </Text>
      <View>
        <Spinner
          borderWidth={"3px"}
          color="#fff"
          color2="rgba(255,255,255,0.8)"
          duration="1s"
          style={{
            position: "absolute",
            height: "48px",
            width: "48px",
            minHeight: "0",
            minWidth: "0",
            boxShadow: "inset 0 0 0 40px #fff"
          }}
        />
        <svg
          version="1.1"
          viewBox="0 0 40 40"
          fill="#218aff"
          height="48"
          style={{ position: "relative" }}
        >
          <path d="M16.8 29c-.3 0-.5-.1-.7-.3-.4-.4-.4-1 0-1.4l7.3-7.3-7.3-7.3c-.4-.4-.4-1 0-1.4s1-.4 1.4 0l8 8c.4.4.4 1 0 1.4l-8 8c-.2.2-.5.3-.7.3z" />
        </svg>
      </View>
    </Flex>
    <Flex style={{ width: 250 }}>
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          padding: 20,
          fontSize: 16
        }}
      >
        {"Get a website"}
      </Text>
      <Browser style={styles.shadow}>
        <Text
          style={{
            backgroundColor: "#563d7c",
            color: "#fff",
            fontSize: 10,
            padding: 10,
            textAlign: "center"
          }}
        >
          {"Fastest website ever"}
        </Text>
        <View style={{ padding: 20, flexGrow: 1 }}>
          <View style={{ flexDirection: "row", flexGrow: 1 }}>
            <View style={{ flexGrow: 1, backgroundColor: "#e8e8e8" }} />
            <Spacer />
            <View style={{ flexGrow: 1, backgroundColor: "#e8e8e8" }} />
            <Spacer />
            <View style={{ flexGrow: 1, backgroundColor: "#e8e8e8" }} />
          </View>
          <Spacer small />
          <View style={{ flexDirection: "row", flexGrow: 1 }}>
            <View style={{ flexGrow: 1, backgroundColor: "#f0f0f0" }} />
            <Spacer />
            <View style={{ flexGrow: 1, backgroundColor: "#f0f0f0" }} />
            <Spacer />
            <View style={{ flexGrow: 1, backgroundColor: "#f0f0f0" }} />
          </View>
          <Spacer small />
          <View style={{ flexDirection: "row", flexGrow: 1 }}>
            <View style={{ flexGrow: 1, backgroundColor: "#f8f8f8" }} />
            <Spacer />
            <View style={{ flexGrow: 1, backgroundColor: "#f8f8f8" }} />
            <Spacer />
            <View style={{ flexGrow: 1, backgroundColor: "#f8f8f8" }} />
          </View>
        </View>
      </Browser>
    </Flex>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flexGrow: 1,
    flexDirection: "row"
  },
  shadow: {
    filter: "drop-shadow(0 4px 10px rgba(0,0,0,.4))"
  }
});

export default InputOutput;
