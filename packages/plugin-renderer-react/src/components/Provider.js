import * as React from "react";
import PropTypes from "prop-types";

import performQuery from "../shared/performQuery";

type props = {|
  children?: React.Node,
  store: Object,
  __prerendering?: boolean
|};

class Provider extends React.Component<props, void> {
  props: props;
  static childContextTypes = {
    query: PropTypes.func,
    phenomic: PropTypes.object.isRequired,
    __prerendering: PropTypes.bool
  };
  getChildContext() {
    return {
      phenomic: this.props.store,
      query: this.query,
      __prerendering: !!this.props.__prerendering
    };
  }
  query = (queries: Array<any>) => {
    performQuery(this.props.store, queries);
  };
  render() {
    return React.Children.only(this.props.children);
  }
}

export default Provider;
