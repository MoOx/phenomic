import React from "react"
import { Route } from "react-router"
import PageContainer from "statinamic/lib/PageContainer"

// Layouts
import LayoutContainer from "../LayoutContainer"

// routes
export default (
  <Route component={ LayoutContainer }>
    <Route path="*" component={ PageContainer } />
  </Route>
)
