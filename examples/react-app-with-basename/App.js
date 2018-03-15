import * as React from "react";
import { Router, Route, useRouterHistory } from "react-router";
// default (browser) history needs a DOM, so memory history is used for static rendering
import { createHistory, createMemoryHistory } from "history";
import {
  createApp,
  Link,
  createContainer,
  query
} from "@phenomic/preset-react-app/lib/client";

const history = useRouterHistory(
  typeof window !== "undefined" ? createHistory : createMemoryHistory
)({ basename: process.env.PHENOMIC_APP_BASENAME });

const Hello = () => (
  <div>
    Hello world! <Link to="/test">Test me!</Link>
  </div>
);

const GoBack = ({ hasError, isLoading, testList }) => (
  <div>
    Bye world! <Link to="/">Go back!</Link>
    <p>
      {hasError && "Oops"}
      {isLoading && "Loading..."}
    </p>
    {testList &&
      testList.node &&
      testList.node.list && <ul>{testList.node.list.map(item => item.id)}</ul>}
  </div>
);

const GoBackContainer = createContainer(GoBack, () => ({
  testList: query({})
}));

export default createApp(() => (
  <Router history={history}>
    <Route path="/" component={Hello} />
    <Route path="/test" component={GoBackContainer} />
  </Router>
));
