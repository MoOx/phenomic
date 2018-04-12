// @flow

import * as React from "react";
import { Router, Route, browserHistory } from "react-router";
import { createApp } from "@phenomic/preset-react-app/lib/client";
import { StyleSheet, css } from "aphrodite/no-important";

if (typeof window !== "undefined" && window._aphrodite) {
  StyleSheet.rehydrate(window._aphrodite);
}

const styles = StyleSheet.create({
  title: {
    fontSize: "1.5em",
    textAlign: "center",
    color: "palevioletred"
  },
  title2: {
    fontSize: "2em",
    textAlign: "right",
    color: "blue"
  }
});

export default createApp(() => (
  <Router history={browserHistory}>
    <Route
      path="/"
      component={() => <h1 className={css(styles.title)}>Hello World!</h1>}
    />
    <Route
      path="/2"
      component={() => <h1 className={css(styles.title2)}>Hello again!</h1>}
    />
  </Router>
));
