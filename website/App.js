// @flow

import * as React from "react";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import { AppRegistry } from "react-native-web";
import { createApp, renderApp } from "@phenomic/preset-react-app/lib/client";
import GA from "react-ga";

import "./defaults.css";
import "./highlights-theme.css";

import Wrapper from "./components/Wrapper";
import Home from "./components/Home";
import PageDoc from "./components/PageDoc";
import Tutorials from "./components/Tutorials";
import Plugins from "./components/Plugins";
import ShowcasePage from "./components/PageShowcase";
import ShowcaseList, { ShowcaseListByTag } from "./components/ShowcaseList";
import PageError from "./components/PageError";
import BlogItem from "./components/BlogItem";
import BlogList from "./components/BlogList";

// Google Analytics
const isProduction = process.env.NODE_ENV === "production";
if (isProduction) GA.initialize("UA-76349880-1");
const pageView = isProduction
  ? () => {
      const url = window.location.pathname + window.location.search;
      GA.set({ page: url });
      GA.pageview(url);
    }
  : () => console.info("New pageview", window.location.href);

// @todo handle more languages
const routes = () => (
  <Router history={browserHistory} onUpdate={pageView}>
    <Route component={Wrapper}>
      <Route path="/" component={Home} />
      <Route path="/en/">
        <IndexRoute component={PageDoc} />
        <Route path="packages/*" component={PageDoc} />
        <Route path="tutorials" component={Tutorials} />
        <Route path="plugins" component={Plugins} />
        <Route path="blog" component={BlogList} />
        <Route path="blog/after/:after" component={BlogList} />
        <Route path="blog/*" component={BlogItem} />
        <Route path="showcase" component={ShowcaseList} />
        <Route path="showcase/after/:after" component={ShowcaseList} />
        <Route
          path="showcase/tag/:showcaseTags"
          component={ShowcaseListByTag}
        />
        <Route
          path="showcase/tag/:showcaseTags/after/:after"
          component={ShowcaseListByTag}
        />
        <Route path="showcase/*" component={ShowcasePage} />
      </Route>
      <Route path="404.html" component={PageError} />
      <Route path="*" component={PageError} />
    </Route>
  </Router>
);

const render = (rootComponent, rootTag) => {
  AppRegistry.registerComponent("App", () => () => rootComponent);
  AppRegistry.runApplication("App", { rootTag });
};

export default createApp(routes, render);

if (module.hot) {
  module.hot.accept(() => renderApp(routes, render));
}

// kill previous website ServiceWorker
if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (const registration of registrations) registration.unregister();
  });
}
