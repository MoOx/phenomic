/* eslint-disable react/no-multi-comp */

import React from "react";
import { renderJSX } from "jsx-test-helpers";

import Html from "../HTML";

test("Html works", () => {
  expect(
    renderJSX(<Html body="body" state="state" u script="/scr/ipt" />)
  ).toMatchSnapshot();
});
