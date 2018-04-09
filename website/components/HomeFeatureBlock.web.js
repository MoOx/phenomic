import * as React from "react";
import { StyleSheet, Text, View } from "react-native-web";

import BackgroundGradient from "./BackgroundGradient";
import Spacer from "./Spacer";

type PropsType = {|
  start: string,
  end: string,
  direction?: string,
  title: string,
  description: string
|};
const FeatureBlock = (props: PropsType) => (
  <BackgroundGradient
    start={props.start}
    end={props.end}
    direction={props.direction}
    style={styles.container}
  >
    <View style={styles.title}>
      <Text style={styles.titleText}>{props.title}</Text>
    </View>
    <Spacer />
    <View style={styles.description}>
      <Text style={styles.descriptionText}>{props.description}</Text>
    </View>
  </BackgroundGradient>
);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    borderRadius: 6,
    padding: 30,
    justifyContent: "space-between"
  },
  title: {
    // flexBasis: "35%"
  },
  description: {
    // flexGrow: 1
    // flexBasis: "65%"
  },
  titleText: {
    padding: 10,
    paddingBottom: 0,
    fontSize: 24,
    color: "#fff",
    // textAlign: "center",
    fontWeight: "700"
  },
  descriptionText: {
    color: "#fff",
    padding: 20,
    fontSize: 16,
    fontWeight: "100",
    textAlign: "right"
  }
});

export default FeatureBlock;
