import "whatwg-fetch"

import React from "react"
import { Router, Route, browserHistory } from "react-router"
import { Renderer } from "phenomic-plugin-renderer-react/lib/client"

import Header from "./components/Header"
import Home from "./components/Home"
import DocPage from "./components/DocPage"
import APIPage from "./components/APIPage"
import APIListPage from "./components/APIListPage"
import ChangelogPage from "./components/ChangelogPage"
import ChangelogListPage from "./components/ChangelogListPage"
import ShowcaseList from "./components/ShowcaseList"
import APITagListPage from "./components/APITagListPage"

const Wrapper = (props: Object) => <div><Header />{props.children}</div>

const app = Renderer.createApp(
  <Router history={ browserHistory }>
    <Route component={ Wrapper }>
      <Route path="/" component={ Home } />
      <Route path="/api" component={ APIListPage } />
      <Route
        path="/api/tag/*"
        component={ APITagListPage }
        collection={{ collection: "tags", by: "collection", value: "api" }}
      />
      <Route path="/api/*" component={ APIPage } collection="api" />
      <Route path="/changelog" component={ ChangelogListPage } />
      <Route path="/changelog/*" component={ ChangelogPage } collection="page" />
      <Route path="/docs/*" component={ DocPage } collection="docs" />
      <Route path="/showcase" component={ ShowcaseList } collection="showcase" />
    </Route>
  </Router>
)

app.render()

module.exports = app
