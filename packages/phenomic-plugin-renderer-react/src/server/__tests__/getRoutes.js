import React from "react"

import getRoutes from "../getRoutes"

const noop = () => {}
it("should resolve URLs based on routes", async () => {
  const Router = noop
  const Route = noop
  const browserHistory = noop
  const Wrapper = noop
  const Home = noop
  const DocPage = noop
  const PageError = noop

  expect(
    await getRoutes({
      routes: (
        <Router history={browserHistory}>
          <Route component={Wrapper}>
            <Route path="/" component={Home} />
            <Route path="/docs/*" component={DocPage} collection="docs" />
            <Route path="*" component={PageError} />
          </Route>
        </Router>
      ),
    }),
  ).toMatchSnapshot()
})
