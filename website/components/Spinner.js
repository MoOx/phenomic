// @flow

import * as React from "react";

type props = {|
  style?: any,
  borderWidth?: string,
  delay: number,
  duration: string,
  color: string,
  color2: string,
|};
class Spinner extends React.PureComponent<props, { visible: boolean }> {
  state = {
    visible: false,
  };

  _timeout: TimeoutID;

  componentDidMount() {
    this._timeout = setTimeout(
      () => this.setState({ visible: true }),
      this.props.delay || 250,
    );
  }
  componentWillUnmount() {
    clearTimeout(this._timeout);
  }

  render() {
    return (
      <React.Fragment>
        <style
          dangerouslySetInnerHTML={{
            __html: `@keyframes Spinner-rotation { from { transform: rotate(0); } to { transform: rotate(359deg); } }`,
          }}
        />
        <div
          style={{
            opacity: this.state.visible ? 1 : 0,
            border: `${this.props.borderWidth || "10px"} solid ${this.props
              .color || "rgba(0,0,0,0.2)"}`,
            borderTopColor: this.props.color2 || "rgba(0,0,0,0.8)",
            animation: `Spinner-rotation ${this.props.duration ||
              "0.8s"} infinite linear`,
            borderRadius: "100%",
            transition: "opacity 4s",
            ...(this.props.style || {}),
          }}
        />
      </React.Fragment>
    );
  }
}

export default Spinner;
