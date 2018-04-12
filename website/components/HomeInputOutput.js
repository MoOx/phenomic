// @flow

import * as React from "react";
import { StyleSheet, View, Text } from "react-native-web";

import Spinner from "./Spinner";
import Flex from "./Flex";
import Browser from "./Browser";
import Spacer from "./Spacer";

const logoWidth = 64;

const InputOutput = () => (
  <Spacer style={styles.row}>
    <Flex style={{ minWidth: 250, maxWidth: 600 }}>
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          padding: 20,
          fontSize: 16,
          fontWeight: "700",
          textShadowColor: "#218aff",
          textShadowRadius: 2
        }}
      >
        {"Choose your favorite technologies"}
      </Text>
      <View
        style={[
          {
            backgroundColor: "#12171C",
            paddingVertical: Spacer.small,
            borderRadius: 6,
            flex: 1
          },
          styles.shadow
        ]}
      >
        <Spacer horizontal style={{ flexDirection: "row" }}>
          <Spacer
            style={{
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              backgroundColor: "#f7df1e"
            }}
          >
            <img src="/assets/javascript.svg" width={logoWidth} />
          </Spacer>
          <Spacer
            style={{
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              backgroundColor: "#fff"
            }}
          >
            <img src="/assets/babel.svg" width={logoWidth} />
          </Spacer>
          <Spacer
            style={{
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              backgroundColor: "#DD4B39"
            }}
          >
            <img src="/assets/reason-square.svg" width={logoWidth} />
          </Spacer>
        </Spacer>
        <Spacer horizontal style={{ flexDirection: "row" }}>
          <Spacer
            style={{
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              backgroundColor: "#fff"
            }}
          >
            <img src="/assets/preact.svg" width={logoWidth} />
          </Spacer>
          <Spacer
            style={{
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              backgroundColor: "#292C33"
            }}
          >
            <img src="/assets/react.svg" width={logoWidth} />
          </Spacer>
          <Spacer
            style={{
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              backgroundColor: "#fff"
            }}
          >
            <img src="/assets/vue.svg" width={logoWidth} />
          </Spacer>
        </Spacer>
        <Spacer horizontal style={{ flexDirection: "row" }}>
          <Spacer
            style={{
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              backgroundColor: "#3F464E"
            }}
          >
            <img src="/assets/graphql.svg" width={logoWidth} />
          </Spacer>
          <Spacer
            style={{
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              backgroundColor: "#fff"
            }}
          >
            <img src="/assets/markdown.svg" width={logoWidth} />
          </Spacer>
          <Spacer
            style={{
              borderRadius: 6,
              justifyContent: "center",
              alignItems: "center",
              flexGrow: 1,
              backgroundColor: "#1A62B2"
            }}
          >
            <img src="/assets/webpack.svg" width={logoWidth} />
          </Spacer>
        </Spacer>
      </View>
    </Flex>
    <Flex
      style={{ justifyContent: "center", alignItems: "center", minWidth: 150 }}
    >
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          padding: 20,
          fontSize: 16,
          fontWeight: "200",
          textShadowColor: "#218aff",
          textShadowRadius: 2
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
    <Flex
      style={{
        minWidth: 250,
        maxWidth: 600,
        minHeight: 400
      }}
    >
      <Text
        style={{
          color: "#fff",
          textAlign: "center",
          padding: 20,
          fontSize: 16,
          fontWeight: "700",
          textShadowColor: "#218aff",
          textShadowRadius: 2
        }}
      >
        {"Get a super fast, static website"}
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
        <Spacer largeVertical>
          <Spacer horizontal style={{ flexDirection: "row" }}>
            <Spacer
              small
              style={{ backgroundColor: "#e8e8e8", width: logoWidth }}
            />
            <Spacer
              small
              style={{ backgroundColor: "#e8e8e8", width: logoWidth }}
            />
            <Spacer
              small
              style={{ backgroundColor: "#e8e8e8", width: logoWidth }}
            />
          </Spacer>
          <Spacer horizontal style={{ flexDirection: "row" }}>
            <Spacer
              small
              style={{ backgroundColor: "#f0f0f0", width: logoWidth }}
            />
            <Spacer
              small
              style={{ backgroundColor: "#f0f0f0", width: logoWidth }}
            />
            <Spacer
              small
              style={{ backgroundColor: "#f0f0f0", width: logoWidth }}
            />
          </Spacer>
          <Spacer horizontal style={{ flexDirection: "row" }}>
            <Spacer
              small
              style={{ backgroundColor: "#f8f8f8", width: logoWidth }}
            />
            <Spacer
              small
              style={{ backgroundColor: "#f8f8f8", width: logoWidth }}
            />
            <Spacer
              small
              style={{ backgroundColor: "#f8f8f8", width: logoWidth }}
            />
          </Spacer>
        </Spacer>
      </Browser>
    </Flex>
  </Spacer>
);

const styles = StyleSheet.create({
  row: {
    flexGrow: 1,
    flexDirection: "row",
    flexWrap: "wrap"
  },
  shadow: {
    borderRadius: 6,
    boxShadow: "0 4px 10px rgba(0,0,0,.25)"
  }
});

export default InputOutput;
