// @flow

import * as React from "react";
import PropTypes from "prop-types";
import hoistStatics from "hoist-non-react-statics";

import { getDisplayName } from "./utils";
import mapValues from "./shared/mapValues";
import { encode } from "./shared/QueryString";

type props = Object;

export default function withPhenomicApi<P>(
  ComposedComponent: React.ComponentType<P>,
  getQueries: (props: Object) => Object = () => ({})
) {
  const socketServerURL =
    // $FlowFixMe yeah yeah
    "http://localhost:" + process.env.PHENOMIC_SOCKET_PORT;
  const displayName = getDisplayName(ComposedComponent);

  class PhenomicContainerWithApi extends React.Component<props, void> {
    unsubscribe: Function | null;
    queries: Object;

    static getQueries = getQueries;
    static contextTypes = {
      query: PropTypes.func,
      phenomic: PropTypes.object,
      __prerendering: PropTypes.bool
    };

    static displayName = `withPhenomicApi(${displayName})`;

    constructor(props: props, context: Object) {
      super(props, context);
      this.computeQueries(props);
      // if we're on the server, let's just run the query
      if (this.context.__prerendering) {
        this.query();
      }
    }

    componentDidMount() {
      if (!this.context.__prerendering) {
        this.query();
      }
      this.unsubscribe = this.context.phenomic.subscribe(() => this.update());
      if (process.env.NODE_ENV !== "production") {
        require("socket.io-client")(socketServerURL).on(
          "change",
          this.forceQuery
        );
      }
    }

    componentWillReceiveProps(props: props) {
      this.computeQueries(props);
      this.schedule(() => this.query());
    }

    componentWillUnmount() {
      if (typeof this.unsubscribe === "function") {
        this.unsubscribe();
      }
      this.unsubscribe = null;

      if (process.env.NODE_ENV !== "production") {
        require("socket.io-client")(socketServerURL).removeListener(
          "change",
          this.forceQuery
        );
      }
    }

    forceQuery = () => {
      this.query(true);
    };
    update = () => {
      this.schedule(() => this.forceUpdate());
    };
    schedule = (func: Function) => {
      requestAnimationFrame(() => {
        if (typeof this.unsubscribe === "function") {
          func();
        }
      });
    };
    computeQueries = (props: props) => {
      this.queries = mapValues(getQueries(props), encode);
    };
    query = (force: boolean = false) => {
      const store = this.context.phenomic;
      const values = Object.keys(this.queries).map(key => this.queries[key]);
      if (force) {
        this.context.query(values);
      } else {
        this.context.query(
          values.filter(item => store.get(item).status !== "idle")
        );
      }
    };
    render() {
      const store = this.context.phenomic;
      const values = Object.keys(this.queries).map(key => this.queries[key]);
      const isLoading = values.some(item => !store.get(item).node);
      const hasErrored = values.some(
        item => store.get(item).status === "error"
      );
      const props = mapValues(this.queries, (value, key) =>
        store.get(this.queries[key])
      );
      if (hasErrored) {
        console.error(
          "An item is in error state",
          values.find(item => store.get(item).status === "error")
        );
        return <ComposedComponent {...this.props} hasError {...props} />;
      }
      return (
        <ComposedComponent {...this.props} isLoading={isLoading} {...props} />
      );
    }
  }

  // $FlowFixMe I am lazy and "it works on my computer"
  return hoistStatics(PhenomicContainerWithApi, ComposedComponent);
}
