const React = require("react")
const mapValues = require("../shared/mapValues")
const QueryString = require("../shared/QueryString")

const emptyObject = {}
const defaultGetQueries = () => emptyObject

function createContainer(Component, getQueries = defaultGetQueries) {

  class PhenomicRouteContainer extends React.Component {

    constructor(props, context) {
      super(props, context)
      this.computeQueries(props)
      // if we're on the server, let's just run the query
      if(this.context.__prerendering) {
        this.query()
      }
      this.forceQuery = this.forceQuery.bind(this)
    }

    componentDidMount() {
      if(!this.context.__prerendering) {
        this.query()
      }
      this.unsubscribe = this.context.store.subscribe(() => this.update())
      if(process.env.NODE_ENV !== "production") {
        require("socket.io-client")("http://localhost:1415")
          .on("change", this.forceQuery)
      }
    }

    forceQuery() {
      this.query(true)
    }

    componentWillUnmount() {
      this.unsubscribe()
      this.unsubscribe = null
      if(process.env.NODE_ENV !== "production") {
        require("socket.io-client")("http://localhost:1415")
          .removeListener("change", this.forceQuery)
      }
    }

    componentWillReceiveProps(props) {
      this.computeQueries(props)
      this.schedule(() => this.query())
    }

    update() {
      this.schedule(() => this.forceUpdate())
    }

    schedule(func) {
      requestAnimationFrame(() => {
        if(this.unsubscribe) {
          func()
        }
      })
    }

    computeQueries(props) {
      this.queries = mapValues(getQueries(props), value => QueryString.encode(value))
    }

    query(force) {
      const store = this.context.store
      const values = Object.keys(this.queries).map(key => this.queries[key])
      if(force) {
        this.context.query(values)
      } else {
        this.context.query(values.filter(item => store.get(item).status !== "idle"))
      }
    }

    render() {
      const store = this.context.store
      const values = Object.keys(this.queries).map(key => this.queries[key])
      const isLoading = values.some(item => !store.get(item).node)
      const hasErrored = values.some(item => store.get(item).status === "error")
      const props = mapValues(this.queries, (value, key) => store.get(this.queries[key]))
      if(hasErrored) {
        return (
          null
        )
      }
      return (
        <Component
          {...this.props}
          isLoading={isLoading}
          {...props}
        />
      )
    }
  }

  PhenomicRouteContainer.getQueries = getQueries

  PhenomicRouteContainer.contextTypes = {
    query: React.PropTypes.func,
    store: React.PropTypes.object,
    __prerendering: React.PropTypes.bool,
  }

  return PhenomicRouteContainer

}

module.exports = createContainer
