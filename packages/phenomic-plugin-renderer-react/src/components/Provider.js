import React from "react"
import PropTypes from "prop-types"

import performQuery from "../shared/performQuery"

type PropsType = {
  children?: React$Element<any>,
  fetch: PhenomicFetch,
  store: Object,
  __prerendering?: boolean,
}
class Provider extends React.Component<void, PropsType, void> {
  props: PropsType
  static childContextTypes = {
    query: PropTypes.func,
    store: PropTypes.object.isRequired,
    __prerendering: PropTypes.bool,
  }
  getChildContext() {
    return {
      store: this.props.store,
      query: this.query,
      __prerendering: !!this.props.__prerendering,
    }
  }
  query = (queries: Array<any>) => {
    performQuery(this.props.store, this.props.fetch, queries)
  }
  render() {
    return React.Children.only(this.props.children)
  }
}

export default Provider
