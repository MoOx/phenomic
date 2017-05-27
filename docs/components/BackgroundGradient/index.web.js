import React from "react";

type PropsType = {
  name: "blueGreen",
  children?: React$Element<any>
};
const BackgroundGradient = (props: PropsType) => (
  <div style={{ ...gradients[props.name] }}>{props.children}</div>
);

const colors = {
  blue: "#006BF6",
  green: "#10E951"
};

const gradients = {
  blueGreen: {
    color: colors.blue,
    background: `linear-gradient(to bottom right, ${colors.blue}, ${colors.green})`
  }
};

export default BackgroundGradient;
