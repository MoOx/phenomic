import React from "react"
import { Route } from "react-router"

const TestContainer = () => (
  <p>{ "TestContainer" }</p>
)

export default (
  <Route>
    <Route path="*" component={ TestContainer } />
  </Route>
)
