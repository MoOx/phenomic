// @flow

import * as React from "react";
import { Router, Route, browserHistory } from "react-router";
import { createApp, renderApp } from "@phenomic/preset-react-app/lib/client";
import { withPhenomicApi } from "@phenomic/preset-react-app/lib/es6/src/phenomicPresetReactApp.bs.js";

import * as Home from "./lib/es6/src/components/Home.bs.js";
import * as Post from "./lib/es6/src/components/Post.bs.js";
import ErrorPage from "./lib/es6/src/components/ErrorPage.bs.js";

const routes = () => (
  <Router history={browserHistory}>
    <Route
      path="/"
      component={withPhenomicApi(Home.jsComponent, Home.queries)}
    />
    <Route
      path="/after/:after"
      component={withPhenomicApi(Home.jsComponent, Home.queries)}
    />
    <Route
      path="blog/*"
      component={withPhenomicApi(Post.jsComponent, Post.queries)}
    />
    <Route path="*" component={ErrorPage} />
    <Route path="404.html" component={ErrorPage} />
  </Router>
);

export default createApp(routes);

if (module.hot) {
  module.hot.accept(() => renderApp(routes));
}
