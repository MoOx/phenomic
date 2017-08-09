import React from "react";
import { Router, Route, browserHistory, Link } from "react-router";

import {
  createApp,
  query,
  BodyRenderer
} from "@phenomic/preset-react-app/lib/client";

const {
  wrapReComponent
} = require("@phenomic/reason/lib/js/src/phenomicRootComponent");
const Home = require("./lib/js/components/home");
const Post = require("./lib/js/components/post");

export default createApp(() =>
  <Router history={browserHistory}>
    <Route
      path="/"
      component={wrapReComponent(Home.jsComponent, Home.queries)}
    />
    <Route
      path="blog/*"
      component={wrapReComponent(Post.jsComponent, Post.queries)}
    />
  </Router>
);
