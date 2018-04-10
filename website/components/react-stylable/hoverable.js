// @flow

import * as React from "react";

type props = {|
  onMouseEnter?: () => void,
  onMouseLeave?: () => void
|};

type state = {|
  hovered: boolean
|};

export default (ComposedComponent: React.ComponentType<*>) => {
  class Hoverable extends React.Component<props, state> {
    props: props;

    state: state = {
      hovered: false
    };

    handleMouseEnter = (event: React$SyntheticEvent): void => {
      this.setState({ hovered: true });
      if (typeof this.props.onMouseEnter === "function") {
        this.props.onMouseEnter(event);
      }
    };

    handleMouseLeave = (event: React$SyntheticEvent): void => {
      this.setState({ hovered: false });
      if (typeof this.props.onMouseLeave === "function") {
        this.props.onMouseLeave(event);
      }
    };

    render() {
      return (
        <ComposedComponent
          {...this.props}
          {...this.state}
          onMouseEnter={this.handleMouseEnter}
          onMouseLeave={this.handleMouseLeave}
        />
      );
    }
  }

  return Hoverable;
};
