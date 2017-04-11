import React from "react"

import mapValues from "../shared/mapValues"
import QueryString from "../shared/QueryString"

const emptyObject = {}
const defaultGetQueries = () => emptyObject
const socketServerURL = "http://localhost:1415"

type PropsType = Object

function createContainer(
  Component: Function,
  getQueries: Function = defaultGetQueries
) {

  class PhenomicRouteContainer extends React.Component<void, PropsType, void> {

    static getQueries = getQueries

    static contextTypes = {
      query: React.PropTypes.func,
      store: React.PropTypes.object,
      __prerendering: React.PropTypes.bool,
    }

    constructor(props: PropsType, context: Object) {
      super(props, context)
      this.computeQueries(props)
      // if we're on the server, let's just run the query
      if (this.context.__prerendering) {
        this.query()
      }
    }

    componentDidMount() {
      if (!this.context.__prerendering) {
        this.query()
      }
      this.unsubscribe = this.context.store.subscribe(() => this.update())
      if (process.env.NODE_ENV !== "production") {
        require("socket.io-client")(socketServerURL)
          .on("change", this.forceQuery)
      }
    }

    componentWillReceiveProps(props: PropsType) {
      this.computeQueries(props)
      this.schedule(() => this.query())
    }

    componentWillUnmount() {
      if (typeof this.unsubscribe === "function") {
        this.unsubscribe()
      }
      this.unsubscribe = null

      if (process.env.NODE_ENV !== "production") {
        require("socket.io-client")(socketServerURL)
          .removeListener("change", this.forceQuery)
      }
    }

    unsubscribe: Function | null

    forceQuery = () => {
      this.query(true)
    }

    update = () => {
      this.schedule(() => this.forceUpdate())
    }

    schedule = (func: Function) => {
      requestAnimationFrame(() => {
        if (typeof this.unsubscribe === "function") {
          func()
        }
      })
    }

    queries: Object

    computeQueries = (props: PropsType) => {
      this.queries = mapValues(getQueries(props), value => QueryString.encode(value))
    }

    query = (force: boolean = false) => {
      const store = this.context.store
      const values = Object.keys(this.queries).map(key => this.queries[key])
      if (force) {
        this.context.query(values)
      }
      else {
        this.context.query(values.filter(item => store.get(item).status !== "idle"))
      }
    }

    render() {
      const store = this.context.store
      const values = Object.keys(this.queries).map(key => this.queries[key])
      const isLoading = values.some(item => !store.get(item).node)
      const hasErrored = values.some(item => store.get(item).status === "error")
      const props = mapValues(this.queries, (value, key) => store.get(this.queries[key]))
      if (hasErrored) {
        return (
          null
        )
      }
      return (
        <Component
          { ...this.props }
          isLoading={ isLoading }
          { ...props }
        />
      )
    }
  }

  return PhenomicRouteContainer

}

export default createContainer
