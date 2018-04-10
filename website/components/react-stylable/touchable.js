// @flow

import * as React from "react";

type props = {|
  onTouchStart?: () => void,
  onTouchEnd?: () => void
|};

type state = {|
  touched: boolean
|};

export default (ComposedComponent: React.ComponentType<*>) => {
  class TouchStartable extends React.Component<props, state> {
    props: props;

    state: state = {
      touched: false
    };

    handleTouchStart = (event: React$SyntheticEvent): void => {
      this.setState({ touched: true });
      if (typeof this.props.onTouchStart === "function") {
        this.props.onTouchStart(event);
      }
    };

    handleTouchEnd = (event: React$SyntheticEvent): void => {
      this.setState({ touched: false });
      if (typeof this.props.onTouchEnd === "function") {
        this.props.onTouchEnd(event);
      }
    };

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          onTouchStart={this.handleTouchStart}
          onTouchEnd={this.handleTouchEnd}
        />
      );
    }
  }

  return TouchStartable;
};
