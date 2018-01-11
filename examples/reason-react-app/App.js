import * as React from "react";
import { Router, Route, browserHistory } from "react-router";
import { createApp, renderApp } from "@phenomic/preset-react-app/lib/client";
import { createContainer } from "@phenomic/preset-react-app/lib/es6_global/src/phenomicPresetReactApp.js";

import * as Home from "./lib/es6_global/src/components/Home";
import * as Post from "./lib/es6_global/src/components/Post";

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
  </Router>
);

export default createApp(routes);

if (module.hot) {
  module.hot.accept(() => renderApp(routes));
}
