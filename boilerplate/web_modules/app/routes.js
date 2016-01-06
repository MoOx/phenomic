import React from "react"
import { Route } from "react-router"
import PageContainer from "statinamic/lib/PageContainer"

// components
import Layout from "Layout"

// routes
export default (
  <Route component={ Layout }>
    <Route path="*" component={ PageContainer } />
  </Route>
)
