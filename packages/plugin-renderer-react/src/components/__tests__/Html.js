/* eslint-disable react/no-multi-comp */

import React from "react";
import { renderJSX } from "jsx-test-helpers";

import Html from "../HTML";

const App = () => <div>{"App"}</div>;
const render = App => {
  const Main = App;
  const State = () => <script type="text/json">{'{st:"ate"}'}</script>;
  const Script = () => <script src="sc/ript" />;
  return {
    Main,
    State,
    Script,
    Body: () =>
      <body>
        <Main />
        <State />
        <Script />
      </body>
  };
};

test("Html works", () => {
  expect(renderJSX(<Html App={App} render={render} />)).toMatchSnapshot();
});
