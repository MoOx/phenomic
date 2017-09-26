import * as React from "react";
import { Router, Route, browserHistory } from "react-router";
import {
  createApp,
  renderApp,
} from "@phenomic/preset-react-app/lib/client";

import HomeContainer from './containers/HomeContainer'
import AboutContainer from './containers/AboutContainer'
import TechPostsContainer from './containers/TechPostsContainer'
import TechPostContainer from './containers/TechPostContainer'
import PhotographyPostContainer from './containers/PhotographyPostContainer'

import PageError from './components/PageError'

const routes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={HomeContainer} />
    <Route path="/about" component={AboutContainer} />
    <Route path="/tech" component={TechPostsContainer} />
    <Route path="/tech/*" component={TechPostContainer} />
    <Route path="/photography/*" component={PhotographyPostContainer} />
    <Route path="*" component={PageError} />
  </Router>
);

export default createApp(routes);

if (module.hot) {
  module.hot.accept(() => renderApp(routes));
}
