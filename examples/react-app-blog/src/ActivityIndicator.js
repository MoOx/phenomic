// @flow

import * as React from "react";
import TopBarProgressIndicator from "react-topbar-progress-indicator";

TopBarProgressIndicator.config({
  barThickness: 4,
  barColors: {
    "0": "#fff",
    "1.0": "#fff"
  },
  shadowBlur: 5
});

class ActivityIndicator extends React.PureComponent<{}, { visible: boolean }> {
  state = {
    visible: false
  };

  _timeout: TimeoutID;

  componentDidMount() {
    this._timeout = setTimeout(() => this.setState({ visible: true }), 250);
  }
  componentWillUnmount() {
    clearTimeout(this._timeout);
  }

  render() {
    return (
      <React.Fragment>
        <TopBarProgressIndicator />
        <style
          dangerouslySetInnerHTML={{
            __html: `
          .ActivityIndicator-loader {
            display: flex;
            height: 25vh;
            justify-content: center;
            align-items: center;
          }

          .ActivityIndicator-spinner {
            height: 5vh;
            min-height: 5rem;
            width: 5vh;
            min-width: 5rem;
            border: 10px solid rgba(0,0,0,0.2);
            border-top-color: rgba(0,0,0,0.8);
            border-radius: 100%;
            animation: ActivityIndicator-rotation 0.8s infinite linear;
            transition: opacity 4s;
          }

          @keyframes ActivityIndicator-rotation {
            from { transform: rotate(0); }
            to { transform: rotate(359deg); }
          }
        `
          }}
        />
        <div className="ActivityIndicator-loader">
          <div
            className="ActivityIndicator-spinner"
            style={{ opacity: this.state.visible ? 1 : 0 }}
          />
        </div>
      </React.Fragment>
    );
  }
}

export default ActivityIndicator;
