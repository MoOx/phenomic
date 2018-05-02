// @flow

import * as React from "react";
import { View, Text, StyleSheet } from "react-native-web";

import Flex from "./Flex";
import Link from "./Link";
import Spacer from "./Spacer";

const GettingStarted = props => {
  return (
    <Flex>
      <View style={styles.row}>
        <Spacer>
          <Text
            style={{
              color: "#32325d",
              fontSize: 24,
              fontWeight: "800"
            }}
          >
            {"Start by choosing your ecosystem"}
          </Text>
        </Spacer>
      </View>
      <View style={styles.logos}>
        {props.node.items.map((item, i) => (
          <Link.Block
            key={i}
            blockProps={{ style: styles.logoWrapper }}
            style={[styles.logo, item.todo && styles.todo]}
            href={item.link}
          >
            <View style={styles.img}>
              <img src={item.icon} height={item.height || 128} />
            </View>
            <Text style={styles.logoTitle}>{item.title}</Text>
          </Link.Block>
        ))}
      </View>
      {/*
      <Spacer large style={styles.row}>
        <Text style={styles.notice}>
          {"You don't see what your are looking for? Maybe look here"}
        </Text>
      </Spacer>
      */}
    </Flex>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center"
  },
  logos: {
    marginTop: 48,
    marginBottom: 24,
    borderTopWidth: 1,
    borderTopColor: "#dfe7ed",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center"
  },
  logoWrapper: {
    minWidth: "33%"
  },
  logo: {
    borderBottomWidth: 1,
    borderBottomColor: "#dfe7ed",
    borderBottomStyle: "solid",
    flexGrow: 1,
    flexDirection: "column",
    paddingVertical: 48,
    alignItems: "center",
    color: "inherit",
    textDecorationStyle: "none"
  },
  logoTitle: {
    fontSize: 18,
    fontWeight: "300",
    color: "#4c4d63"
  },
  img: {
    flexGrow: 1,
    justifyContent: "center",
    marginBottom: 24
  },
  todo: {
    opacity: 0.25,
    filter: "blur(1px) grayscale(75%)"
  },
  notice: {
    opacity: 0.25,
    // fontSize: 24,
    paddingVertical: 48
  }
});

export default GettingStarted;
