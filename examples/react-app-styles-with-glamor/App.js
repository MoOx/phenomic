import React from "react";
import { Router, Route, browserHistory } from "react-router";
import { createApp } from "@phenomic/preset-react-app/lib/client";
import { css, rehydrate } from "glamor";

if (typeof window !== "undefined" && window._glam) {
  rehydrate(window._glam);
}

const title = css({
  fontSize: "1.5em",
  textAlign: "center",
  color: "palevioletred"
});

const title2 = css({
  fontSize: "2em",
  textAlign: "right",
  color: "blue"
});

export default createApp(() => (
  <Router history={browserHistory}>
    <Route path="/" component={() => <h1 {...title}>Hello World!</h1>} />
    <Route path="/2" component={() => <h1 {...title2}>Hello again!</h1>} />
  </Router>
));
