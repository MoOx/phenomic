import React from "react";
import { View } from "react-primitives";

type PropsType = {
  name: "blueGreen",
  style: any,
  children?: React$Element<any>
};
const BackgroundGradient = (props: PropsType) => (
  <div style={{ ...gradients[props.name] }}>
    <View style={props.style}>
      {props.children}
    </View>
  </div>
);

const colors = {
  blue: "#006BF6",
  green: "#10E951"
};

const gradients = {
  blueGreen: {
    backgroundColor: colors.blue,
    background: `linear-gradient(to bottom right, ${colors.blue}, ${colors.green})`
  }
};

export default BackgroundGradient;
