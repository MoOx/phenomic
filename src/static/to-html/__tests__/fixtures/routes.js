import React from "react"
import { Route } from "react-router"

/* eslint-disable react/no-multi-comp */

const TestContainer = () => (
  <p>{ "TestContainer" }</p>
)

const ReactTestContainer = () => (
  <p>{ "ReactTestContainer" }</p>
)

export default (
  <Route>
    <Route path="test" component={ ReactTestContainer } />
    <Route path="*" component={ TestContainer } />
  </Route>
)
