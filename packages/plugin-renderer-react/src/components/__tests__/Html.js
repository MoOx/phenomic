// @flow

/* eslint-disable react/no-multi-comp */

import * as React from "react";
import { renderJSX } from "jsx-test-helpers";

import Html from "../HTML";

const App = () => <div>{"App"}</div>;
const render = App => {
  return {
    Main: () => <App />,
    State: () => <script type="text/json">{'{st:"ate"}'}</script>,
    Script: () => <script src="sc/ript" />,
    Style: () => <link src="sc/ript" />,
    assets: {}
  };
};

test("Html works", () => {
  expect(renderJSX(<Html App={App} render={render} />)).toMatchSnapshot();
});
