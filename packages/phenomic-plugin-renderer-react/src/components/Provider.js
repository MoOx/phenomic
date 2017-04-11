import React from "react"

import performQuery from "../shared/performQuery"

type PropsType = {
  children?: React$Element<any>,
  fetch: PhenomicFetch,
  store: Object,
  onFetchComplete?: Function,
  onError?: Function,
  __prerendering?: bool,
}
class Provider extends React.Component<void, PropsType, void> {
  props: PropsType

  static childContextTypes = {
    query: React.PropTypes.func,
    store: React.PropTypes.object.isRequired,
    __prerendering: React.PropTypes.bool,
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
