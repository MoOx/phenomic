import React from "react";
import { Router, Route, browserHistory } from "react-router";
import { createApp, renderApp } from "@phenomic/preset-react-app/lib/client";

import "./defaults.css";

import Html from "./Html";

const {
  wrapReComponent
} = require("@phenomic/reason/lib/js/src/phenomicRootComponent");

const Home = require("./lib/js/src/components/home").jsComponent;
const GettingStarted = require("./lib/js/src/components/gettingStarted")
  .jsComponent;
const News = require("./lib/js/src/components/news");
const Showcase = require("./lib/js/src/components/showcase");

const routes = () =>
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
    <Route path="/getting-started" component={GettingStarted} />
    <Route
      path="/news"
      component={wrapReComponent(News.jsComponent, News.queries)}
    />
    <Route
      path="/showcase"
      component={wrapReComponent(Showcase.jsComponent, Showcase.queries)}
    />
  </Router>;

export default createApp(routes, Html);

if (module.hot) {
  module.hot.accept(() => renderApp(routes));
}

// kill previous website ServiceWorker
if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (const registration of registrations) registration.unregister();
  });
}
