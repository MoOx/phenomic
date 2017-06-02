import React from "react";
import { StyleSheet, View, Text } from "react-primitives";

/* eslint-disable react-native/no-inline-styles */

import Browser from "../Browser";
import Spacer from "../Spacer";

const CodeExample = () => (
  <View>
    <View style={styles.row}>
      <View>
        <View
          style={{ backgroundColor: "#12171C", padding: 10, borderRadius: 6 }}
        >
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                padding: 15,
                borderRadius: 6,
                justifyContent: "center",
                alignItems: "center",
                width: `calc(50% - ${Spacer.default / 2}px)`,
                backgroundColor: "#fff"
              }}
            >
              <img src="/assets/markdown.svg" width="96" />
            </View>
            <Spacer />
            <View
              style={{
                padding: 15,
                borderRadius: 6,
                justifyContent: "center",
                alignItems: "center",
                width: `calc(50% - ${Spacer.default / 2}px)`,
                backgroundColor: "#fff"
              }}
            >
              <img src="/assets/react.svg" width="96" />
            </View>
          </View>
          <Spacer small />
          <View style={{ flexDirection: "row" }}>
            <View
              style={{
                padding: 15,
                borderRadius: 6,
                justifyContent: "center",
                alignItems: "center",
                width: `calc(50% - ${Spacer.default / 2}px)`,
                backgroundColor: "#1A62B2"
              }}
            >
              <img src="/assets/webpack.svg" width="96" />
            </View>
            <Spacer />
            <View
              style={{
                padding: 15,
                borderRadius: 6,
                justifyContent: "center",
                alignItems: "center",
                width: `calc(50% - ${Spacer.default / 2}px)`,
                backgroundColor: "#7ED321"
              }}
            >
              <Text
                style={{
                  fontSize: 96,
                  lineHeight: 60,
                  color: "#fff",
                  fontFamily: "serif"
                }}
              >
                {"···"}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            backgroundColor: "#fff",
            width: 100,
            height: 100,
            borderRadius: 100,
            boxShadow: "0 0 6px rgba(0,0,0,.4)",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <Text style={{ color: "#4990E2", fontSize: 36 }}>{"→"}</Text>
        </View>
      </View>
      <View>
        <Browser style={{ width: 300 }}>
          <Text
            style={{
              backgroundColor: "#553A81",
              color: "#fff",
              fontSize: "10",
              padding: "10",
              textAlign: "center"
            }}
          >
            {"Fastest website ever"}
          </Text>
          <View style={{ padding: 20, flex: 1 }}>
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View style={{ flex: 1, backgroundColor: "#E8E9E8" }} />
              <Spacer />
              <View style={{ flex: 1, backgroundColor: "#E8E9E8" }} />
              <Spacer />
              <View style={{ flex: 1, backgroundColor: "#E8E9E8" }} />
            </View>
            <Spacer small />
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View style={{ flex: 1, backgroundColor: "#E8E9E8" }} />
              <Spacer />
              <View style={{ flex: 1, backgroundColor: "#E8E9E8" }} />
              <Spacer />
              <View style={{ flex: 1, backgroundColor: "#E8E9E8" }} />
            </View>
            <Spacer small />
            <View style={{ flexDirection: "row", flex: 1 }}>
              <View style={{ flex: 1, backgroundColor: "#E8E9E8" }} />
              <Spacer />
              <View style={{ flex: 1, backgroundColor: "#E8E9E8" }} />
              <Spacer />
              <View style={{ flex: 1, backgroundColor: "#E8E9E8" }} />
            </View>
          </View>
        </Browser>
      </View>
    </View>
  </View>
);

const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: "row"
  }
});

export default CodeExample;
