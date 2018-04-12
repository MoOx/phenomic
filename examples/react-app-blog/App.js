// @flow

import * as React from "react";
import { Router, Route, browserHistory } from "react-router";
import { createApp, renderApp } from "@phenomic/preset-react-app/lib/client";

import "./highlights-theme.css";

import Page from "./src/Page";
import PageBlog from "./src/PageBlog";
import PageBlogPost from "./src/PageBlogPost";
import PageRepositories from "./src/PageRepositories";
import PageError from "./src/PageError";

const routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={Page} />
    <Route path="/blog/" component={PageBlog} />
    <Route path="/blog/after/:after" component={PageBlog} />
    <Route path="/blog/*" component={PageBlogPost} />
    <Route path="/repositories/" component={PageRepositories} />
    <Route path="/repositories/page/:page" component={PageRepositories} />
    {/* for static hosting, we often need an explicit 404.html */}
    <Route path="404.html" component={PageError} />
    <Route path="*" component={Page} />
  </Router>
);

export default createApp(routes);

if (module.hot) {
  module.hot.accept(() => renderApp(routes));
}
