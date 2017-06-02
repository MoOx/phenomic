import React from "react";
import { StyleSheet } from "react-primitives";

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
    className={StyleSheet.resolve(props.style).className}
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
