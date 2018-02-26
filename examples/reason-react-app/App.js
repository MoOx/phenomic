import * as React from "react";
import { Router, Route, browserHistory } from "react-router";
import { createApp, renderApp } from "@phenomic/preset-react-app/lib/client";
import { createContainer } from "@phenomic/preset-react-app/lib/es6/src/phenomicPresetReactApp.js";

import * as Home from "./lib/es6/src/components/Home";
import * as Post from "./lib/es6/src/components/Post";
import ErrorPage from "./lib/es6/src/components/ErrorPage";

const routes = () => (
  <Router history={browserHistory}>
    <Route
      path="/"
      component={createContainer(Home.jsComponent, Home.queries)}
    />
    <Route
      path="/after/:after"
      component={createContainer(Home.jsComponent, Home.queries)}
    />
    <Route
      path="blog/*"
      component={createContainer(Post.jsComponent, Post.queries)}
    />
    <Route path="*" component={ErrorPage} />
    <Route path="404.html" component={ErrorPage} />
  </Router>
);

export default createApp(routes);

if (module.hot) {
  module.hot.accept(() => renderApp(routes));
}
