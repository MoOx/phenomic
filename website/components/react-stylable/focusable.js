// @flow

import * as React from "react";

type props = {|
  onFocus?: () => void,
  onBlur?: () => void
|};

type state = {|
  focused: boolean
|};

export default (ComposedComponent: React.ComponentType<*>) => {
  class Focusable extends React.Component<props, state> {
    props: props;

    state: state = {
      focused: false
    };

    handleFocus = (event: React$SyntheticEvent): void => {
      this.setState({ focused: true });
      if (typeof this.props.onFocus === "function") {
        this.props.onFocus(event);
      }
    };

    handleBlur = (event: React$SyntheticEvent): void => {
      this.setState({ focused: false });
      if (typeof this.props.onBlur === "function") {
        this.props.onBlur(event);
      }
    };

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
        />
      );
    }
  }

  return Focusable;
};
