// @flow

import * as React from "react";
import { Router, Route, browserHistory } from "react-router";
import { createApp } from "@phenomic/preset-react-app/lib/client";
import { AppRegistry, Text } from "react-native-web";

const Title = props => (
  <Text
    {...props}
    style={{
      fontSize: "1.5em",
      textAlign: "center",
      color: "palevioletred"
    }}
  />
);

const Title2 = props => (
  <Text
    {...props}
    style={{
      fontSize: "2em",
      textAlign: "right",
      color: "blue"
    }}
  />
);

const routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={() => <Title>Hello World!</Title>} />
    <Route path="/2" component={() => <Title2>Hello again!</Title2>} />
  </Router>
);

const render = (rootComponent, rootTag) => {
  AppRegistry.registerComponent("App", () => () => rootComponent);
  AppRegistry.runApplication("App", { rootTag });
};

export default createApp(routes, render);
