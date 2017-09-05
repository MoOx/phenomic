import * as React from "react";
import { Router, Route, browserHistory } from "react-router";
import { createApp } from "@phenomic/preset-react-app/lib/client";

export default createApp(() => (
  <Router history={browserHistory}>
    <Route path="/" component={() => <div>Hello world!</div>} />
  </Router>
));
