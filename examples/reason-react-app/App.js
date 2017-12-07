import * as React from "react";
import { Router, Route, browserHistory } from "react-router";
import { createApp } from "@phenomic/preset-react-app/lib/client";

const {
  createContainer
} = require("@phenomic/preset-react-app/lib/js/src/phenomicPresetReactApp.js");

const Home = require("./lib/js/components/home");
const Post = require("./lib/js/components/post");

export default createApp(() => (
  <Router history={browserHistory}>
    <Route
      path="/"
      component={createContainer(Home.jsComponent, Home.queries)}
    />
    <Route
      path="blog/*"
      component={createContainer(Post.jsComponent, Post.queries)}
    />
  </Router>
));

if (module.hot) {
  module.hot.accept(() => renderApp(routes));
}
