// @flow

import React from "react";

import Hoverable from "./hoverable";
import Focusable from "./focusable";
import Touchable from "./touchable";
import TouchableMouse from "./touchable-mouse";

type p = {|
  children?: React$Element<any>,

  // hoc
  hovered: boolean,
  focused: boolean,
  touched: boolean,

  // user
  style?: any,
  hoveredStyle?: any,
  focusedStyle?: any,
  touchedStyle?: any,
  hoveredOrFocusedStyle?: any,
|};

const Stylable = (props: p) => {
  const {
    hovered,
    focused,
    touched,
    style,
    hoveredStyle,
    focusedStyle,
    touchedStyle,
    hoveredOrFocusedStyle,
    children,
    ...othersProps
  } = props;

  return React.cloneElement(children, {
    ...othersProps,
    style: [
      style,
      hovered && hoveredStyle,
      focused && focusedStyle,
      (hovered || focused) && hoveredOrFocusedStyle,
      touched && touchedStyle,
    ],
  });
};

export default Hoverable(Focusable(Touchable(TouchableMouse(Stylable))));
