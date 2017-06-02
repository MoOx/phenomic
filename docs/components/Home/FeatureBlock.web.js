import React from "react";
import { StyleSheet, Text, View } from "react-primitives";

type PropsType = {
  start: string,
  end: string,
  direction?: string,
  style: any,
  children?: React$Element<any>
};
const FeatureBlock = (props: PropsType) => (
  <div style={{ width: "100%", flexGrow: 1 }}>
    <div
      style={{
        ...rawStyles,
        ...makeGradient(props.start, props.end, props.direction),
        borderRadius: 6
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          padding: 10,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <View style={styles.title}>
          <Text style={styles.titleText}>{props.title}</Text>
        </View>
        <View style={styles.description}>
          <Text style={styles.descriptionText}>{props.description}</Text>
        </View>
      </div>
    </div>
  </div>
);

const styles = StyleSheet.create({
  title: {
    flexBasis: "25%"
  },
  description: {
    flexBasis: "75%"
  },
  titleText: {
    padding: 10,
    paddingBottom: 0,
    fontSize: 24,
    color: "#fff",
    textAlign: "center",
    fontWeight: "700"
  },
  descriptionText: {
    color: "#fff",
    padding: 20,
    fontSize: 16
  }
});
const rawStyles = {
  display: "block",
  paddingBottom: "100%",
  borderRadius: 10,
  position: "relative"
};

const makeGradient = (start, end, direction = "to bottom right") => ({
  backgroundColor: start,
  backgroundImage: `linear-gradient(${direction}, ${start}, ${end})`
});

export default FeatureBlock;
