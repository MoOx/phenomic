// @flow

import * as React from "react";
import { Router, Route, browserHistory } from "react-router";
import { createApp } from "@phenomic/preset-react-app/lib/client";

import "./styles.css";

export default createApp(() => (
  <Router history={browserHistory}>
    <Route
      path="/"
      component={() => <div className="helloWorld">Hello World!</div>}
    />
  </Router>
));
