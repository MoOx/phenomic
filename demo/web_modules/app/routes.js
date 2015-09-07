import React from "react"
import { Route } from "react-router"
import PageContainer from "statinamic/lib/PageContainer"

// components
import Layout from "Layout"
import Home from "Home"

// routes
export default (
  <Route component={Layout}>
    <Route path="/" component={Home} />
    <Route path="*" component={PageContainer} />
  </Route>
)
