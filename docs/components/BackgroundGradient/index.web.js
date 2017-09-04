import React from "react";
// https://github.com/lelandrichardson/react-primitives/issues/72
// import { StyleSheet } from "react-primitives";
import StyleSheet from "react-native-web/dist/apis/StyleSheet/registry.js"; // eslint-disable-line

type PropsType = {
  start: string,
  end: string,
  direction?: string,
  style: any,
  children?: React$Element<any>
};
const BackgroundGradient = (props: PropsType) => (
  <div
    style={{
      ...rawStyles,
      ...makeGradient(props.start, props.end, props.direction)
    }}
    className={props.style && StyleSheet.resolve(props.style).className}
  >
    {props.children}
  </div>
);

const rawStyles = {
  display: "flex",
  flexDirection: "column"
};

const makeGradient = (start, end, direction = "to bottom right") => ({
  backgroundColor: start,
  background: `linear-gradient(${direction}, ${start}, ${end})`
});

export default BackgroundGradient;
