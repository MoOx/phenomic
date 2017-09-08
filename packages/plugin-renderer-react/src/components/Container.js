import * as React from "react";
import PropTypes from "prop-types";

import mapValues from "../shared/mapValues";
import { encode } from "../shared/QueryString";

const emptyObject = {};
const defaultGetQueries = () => emptyObject;
const socketServerURL = "http://localhost:1415";

type PropsType = Object;

function createContainer(
  Component: Function,
  getQueries: Function = defaultGetQueries
) {
  class PhenomicRouteContainer extends React.Component<PropsType, void> {
    static getQueries = getQueries;
    static contextTypes = {
      query: PropTypes.func,
      phenomic: PropTypes.object,
      __prerendering: PropTypes.bool
    };
    constructor(props: PropsType, context: Object) {
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

    componentWillReceiveProps(props: PropsType) {
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

    unsubscribe: Function | null;
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
    queries: Object;
    computeQueries = (props: PropsType) => {
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
        return <Component {...this.props} hasError {...props} />;
      }
      return <Component {...this.props} isLoading={isLoading} {...props} />;
    }
  }

  return PhenomicRouteContainer;
}

export default createContainer;
