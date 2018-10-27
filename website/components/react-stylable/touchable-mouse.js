// @flow

import * as React from "react";

type props = {|
  onMouseDown?: () => void,
  onMouseUp?: () => void,
|};

type state = {|
  touched: boolean,
|};

export default (ComposedComponent: React.ComponentType<*>) => {
  class MouseDownable extends React.Component<props, state> {
    props: props;

    state: state = {
      touched: false,
    };

    handleMouseDown = (event: React$SyntheticEvent): void => {
      this.setState({ touched: true });
      if (typeof this.props.onMouseDown === "function") {
        this.props.onMouseDown(event);
      }
    };

    handleMouseUp = (event: React$SyntheticEvent): void => {
      this.setState({ touched: false });
      if (typeof this.props.onMouseUp === "function") {
        this.props.onMouseUp(event);
      }
    };

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        />
      );
    }
  }

  return MouseDownable;
};
