import React from "react";
import { Router, Route, browserHistory } from "react-router";
import { createApp } from "@phenomic/preset-react-app/lib/client";
import {hydrate} from 'emotion'
import Home from './components/Home';

// window._emotion is set inside html.js
// caches emotion styles
if (typeof window !== 'undefined' && window._emotion) {
  hydrate(window._emotion)
}

export default createApp(() => (
  <Router history={browserHistory}>
    <Route path="/" component={Home} />
  </Router>
));