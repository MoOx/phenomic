import React from "react";
import { Router, Route, browserHistory } from "react-router";
import { createApp } from "@phenomic/preset-react-app/lib/client";
import Radium from "radium";

const styles = {
  title: {
    fontSize: "1.5em",
    textAlign: "center",
    color: "palevioletred",
    ":hover": {
      color: "red"
    },
    "@media (max-width: 1000px)": {
      color: "orange"
    }
  },
  title2: {
    fontSize: "2em",
    textAlign: "right",
    color: "blue"
  }
};

export default createApp(() => (
  <Router history={browserHistory}>
    <Route
      path="/"
      component={Radium(() => <h1 style={styles.title}>Hello World!</h1>)}
    />
    <Route
      path="/2"
      component={Radium(() => <h1 style={styles.title2}>Hello again!</h1>)}
    />
  </Router>
));
