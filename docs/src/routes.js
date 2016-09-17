import React from "react"
import { Route } from "react-router"

import AppContainer from "./AppContainer.js"
import { PageContainer as PhenomicPageContainer } from "phenomic"

import Page from "./layouts/Page"
import PageError from "./layouts/PageError"
import PageLoading from "./layouts/PageLoading"
import Homepage from "./layouts/Homepage"
import Showcase from "./components/Showcase"

const DocsPageContainer = (props) => (
  <PhenomicPageContainer
    { ...props }
    layouts={ {
      Page,
      PageError,
      PageLoading,
      Homepage,
    } }
  />
)

export default (
  <Route component={ AppContainer }>
    <Route path="showcase" component={ Showcase } />
    <Route path="showcase/tag/:showcaseTag" component={ Showcase } />
    <Route path="*" component={ DocsPageContainer } />
  </Route>
)
