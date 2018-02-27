import * as React from "react";
import { StyleSheet, createElement } from "react-native-web";

type PropsType = {
  start: string,
  end: string,
  direction?: string,
  style: any,
  children?: React.Node
};
const Div = props => createElement("div", props);
// eslint-disable-next-line react/no-multi-comp
const BackgroundGradient = (props: PropsType) => (
  <Div
    style={[
      styles.container,
      makeGradient(props.start, props.end, props.direction),
      props.style
    ]}
  >
    {props.children}
  </Div>
);

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column"
  }
});

const makeGradient = (start, end, direction = "to bottom right") => ({
  backgroundColor: start,
  background: `linear-gradient(${direction}, ${start}, ${end})`
});

export default BackgroundGradient;
