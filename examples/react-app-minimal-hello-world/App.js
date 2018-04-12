// @flow

import * as React from "react";
import { Router, Route, browserHistory } from "react-router";
import { createApp } from "@phenomic/preset-react-app/lib/client";
// import { createApp, renderApp } from "@phenomic/preset-react-app/lib/client";

export default createApp(() => (
  <Router history={browserHistory}>
    <Route path="/" component={() => <div>Hello world!</div>} />
  </Router>
));

// uncommment to get hot loading
// if (module.hot) {
//   module.hot.accept(() => renderApp(routes));
// }
