import React from "react"
import { Route } from "react-router"
import { createStore } from "redux"

const TestContainer = () => (
  <p>{ "TestContainer" }</p>
)

export const testStore = createStore(
  (state) => (state),
  {
    pages: {
      "": {
        home: "page",
      },
    },
    "collection": {
      "": {
        head: {
          foo: "bar",
        },
      },
    },
  }
)

export const testRoutes = <Route path="*" component={ TestContainer } />
