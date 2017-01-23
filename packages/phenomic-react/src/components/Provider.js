import React from "react"

import performQuery from "../shared/performQuery"

class Provider extends React.Component {
  constructor(props) {
    super(props)
    this.query = this.query.bind(this)
  }
  getChildContext() {
    return {
      store: this.props.store,
      query: this.query,
      __prerendering: !!this.props.__prerendering,
    }
  }
  query(queries) {
    performQuery(this.props.store, this.props.fetch, queries)
  }
  render() {
    return React.Children.only(this.props.children)
  }
}

Provider.propTypes = {
  children: React.PropTypes.node.isRequired,
  fetch: React.PropTypes.func.isRequired,
  store: React.PropTypes.object.isRequired,
  onFetchComplete: React.PropTypes.func,
  onError: React.PropTypes.func,
  __prerendering: React.PropTypes.bool,
}

Provider.childContextTypes = {
  query: React.PropTypes.func,
  store: React.PropTypes.object.isRequired,
  __prerendering: React.PropTypes.bool,
}

export default Provider
