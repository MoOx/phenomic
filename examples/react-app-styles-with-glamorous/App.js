// @flow

import * as React from "react";
import { Router, Route, browserHistory } from "react-router";
import { createApp } from "@phenomic/preset-react-app/lib/client";
import glamorous from "glamorous";
import { rehydrate } from "glamor";

if (typeof window !== "undefined" && window._glam) {
  rehydrate(window._glam);
}

const Title = glamorous.h1({
  fontSize: "1.5em",
  textAlign: "center",
  color: "palevioletred"
});

const Title2 = glamorous.h1({
  fontSize: "2em",
  textAlign: "right",
  color: "blue"
});

export default createApp(() => (
  <Router history={browserHistory}>
    <Route path="/" component={() => <Title>Hello World!</Title>} />
    <Route path="/2" component={() => <Title2>Hello again!</Title2>} />
  </Router>
));
