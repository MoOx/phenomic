// @flow

import * as React from "react";
import hoistStatics from "hoist-non-react-statics";

import { getDisplayName } from "./utils";

type props = {|
  // react-router v3
  location: any,
  params: {|
    // SSR trick
    __initialPropsForSSR: Object,
    __initialErrorForSSR: any,
  |},
|};

type state = {|
  status: "loading" | "ready" | "error",
  props?: Object,
  error?: any,
|};

export default function withInitialProps<P>(
  ComposedComponent: React.ComponentType<P>,
) {
  const displayName = getDisplayName(ComposedComponent);

  class PhenomicContainerWithInitialProps extends React.Component<
    props,
    state,
  > {
    state: state = {
      status: "loading",
    };

    _previousInitialPropsArgs = {
      pathname: undefined,
      params: undefined,
    };

    static displayName = `withInitialProps(${displayName})`;

    constructor(props: props) {
      super(props);

      // SSR
      if (props.params.__initialPropsForSSR) {
        this.state = {
          status: "ready",
          props: props.params.__initialPropsForSSR,
        };
      }
      if (props.params.__initialErrorForSSR) {
        this.state = {
          status: "error",
          error: props.params.__initialErrorForSSR,
        };
      }
    }

    componentDidMount() {
      // CSR
      this.update();
    }

    componentDidUpdate() {
      // CSR
      this.update();
    }

    update() {
      const initialPropsArgs = {
        pathname: this.props.location.pathname,
        params: this.props.params,
      };
      if (
        this._previousInitialPropsArgs.pathname !== initialPropsArgs.pathname ||
        this._previousInitialPropsArgs.params !== initialPropsArgs.params
      ) {
        this._previousInitialPropsArgs = initialPropsArgs;
        // $FlowFixMe it's a requirement
        const res = ComposedComponent.getInitialProps(initialPropsArgs);
        if (res.then) {
          res.then(
            props => this.setState({ status: "ready", props }),
            error => this.setState({ status: "error", error }),
          );
        } else {
          // probably an edge case, but just in case people do weird things :)
          // eslint-disable-next-line react/no-did-mount-set-state
          this.setState({ status: "ready", props: res });
        }
      }
    }

    render() {
      return (
        <ComposedComponent
          {...this.props}
          status={this.state.status}
          error={this.state.error}
          {...this.state.props}
        />
      );
    }
  }

  // $FlowFixMe I am lazy and "it works on my computer"
  return hoistStatics(PhenomicContainerWithInitialProps, ComposedComponent);
}
