// @flow

import * as React from "react";

import getRoutes from "../getRoutes";

const Noop = () => {
  return null;
};
const noop = () => {};
it("should resolve URLs based on routes", async () => {
  const Router = Noop;
  const Route = Noop;
  const browserHistory = noop;
  const Wrapper = Noop;
  const Home = Noop;
  const DocPage = Noop;
  const PageError = Noop;

  expect(
    await getRoutes({
      routes: (
        <Router history={browserHistory}>
          <Route component={Wrapper}>
            <Route path="/" component={Home} />
            <Route path="/docs/*" component={DocPage} />
            <Route path="*" component={PageError} />
          </Route>
        </Router>
      ),
    }),
  ).toMatchSnapshot();
});
