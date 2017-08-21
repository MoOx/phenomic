import React from "react";
import { Router, Route, browserHistory } from "react-router";
import { createApp, renderApp } from "@phenomic/preset-react-app/lib/client";

import "./defaults.css";

import Wrapper from "./components/Wrapper";
import Home from "./components/Home";
import GettingStarted from "./components/GettingStarted";
import DocPage from "./components/Page/Doc";
import ShowcasePage from "./components/Page/Showcase";
import ShowcaseList, { ShowcaseListByTag } from "./components/ShowcaseList";
import PageError from "./components/PageError";
import NewsItem from "./components/News/NewsItem";
import NewsList from "./components/News/NewsList";

const routes = () =>
  <Router history={browserHistory}>
    <Route component={Wrapper}>
      <Route path="/" component={Home} />
      <Route path="/docs/getting-started" component={GettingStarted} />
      <Route path="/docs/*" component={DocPage} />
      <Route path="/showcase" component={ShowcaseList} />
      <Route path="/showcase/after/:after" component={ShowcaseList} />
      <Route path="/showcase/tag/:showcaseTags" component={ShowcaseListByTag} />
      <Route
        path="/showcase/tag/:showcaseTags/after/:after"
        component={ShowcaseListByTag}
      />
      <Route path="/showcase/*" component={ShowcasePage} />
      <Route path="/news" component={NewsList} />
      <Route path="/news/after/:after" component={NewsList} />
      <Route path="/news/*" component={NewsItem} />
      <Route path="404.html" component={PageError} />
      <Route path="*" component={PageError} />
    </Route>
  </Router>;

export default createApp(routes);

if (module.hot) {
  module.hot.accept(() => renderApp(routes));
}

// kill previous website ServiceWorker
if (typeof navigator !== "undefined" && "serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(registrations => {
    for (const registration of registrations) registration.unregister();
  });
}
