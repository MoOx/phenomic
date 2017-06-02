import React from "react";
import { Router, Route, browserHistory } from "react-router";
import { createApp, renderApp } from "@phenomic/preset-react-app/lib/client";

import "./defaults.css";

import Html from "./Html";
import Wrapper from "./components/Wrapper";
import Home from "./components/Home";
import GettingStarted from "./components/GettingStarted";
import DocPage from "./components/Page/Doc";
import ShowcasePage from "./components/Page/Showcase";
import ShowcaseList from "./components/ShowcaseList";
import PageError from "./components/PageError";
import NewsItem from "./components/News/NewsItem";
import NewsList from "./components/News/NewsList";

const routes = () => (
  <Router history={browserHistory}>
    <Route component={Wrapper}>
      <Route path="/" component={Home} />
      <Route path="/docs/getting-started" component={GettingStarted} />
      <Route path="/docs/*" component={DocPage} collection="docs" />
      <Route path="/showcase" component={ShowcaseList} collection="showcase" />
      <Route
        path="/showcase/tag/:tag"
        component={ShowcaseList}
        collection="showcase"
      />
      {/*
      <Route
        path="/showcase/after/:after"
        component={ShowcaseList}
        collection="showcase"
        paginated
      />
      */}
      <Route
        path="/showcase/*"
        component={ShowcasePage}
        collection="showcase"
      />
      <Route path="/news/*" component={NewsItem} collection="news" />
      <Route path="/news" component={NewsList} collection="news" />
      <Route path="*" component={PageError} />
    </Route>
  </Router>
);

export default createApp(routes, Html);

if (module.hot) {
  module.hot.accept(() => renderApp(routes));
}
