/* eslint-disable react/no-multi-comp */

import React from "react";
import { render, renderJSX } from "jsx-test-helpers";

import BodyRenderer from "../BodyRenderer";

test("BodyRenderer tells you when pass undefined", () => {
  const spy = jest.spyOn(console, "error");
  expect(render(<BodyRenderer />)).toMatchSnapshot();
  expect(spy).toHaveBeenCalled();
});

test("BodyRenderer works with raw html", () => {
  expect(
    renderJSX(<BodyRenderer>{"<h1>Test</h1"}</BodyRenderer>)
  ).toMatchSnapshot();
});

test("BodyRenderer works with phenomic json body", () => {
  expect(
    renderJSX(
      <BodyRenderer>
        {{
          t: "p",
          p: { className: "test" },
          c: [
            {
              t: "a",
              p: { href: "http://test" },
              c: "Link"
            }
          ]
        }}
      </BodyRenderer>
    )
  ).toMatchSnapshot();
});

test("BodyRenderer accepts a map for components", () => {
  const map = {
    p: function View(props: Object) {
      return <div>{props.children}</div>;
    },
    a: function Link(props: Object) {
      return (
        <a href={props.href} className="auto">
          {props.children}
        </a>
      );
    }
  };
  expect(
    renderJSX(
      <BodyRenderer components={map}>
        {{
          t: "p",
          p: { className: "test" },
          c: [
            {
              t: "a",
              p: { href: "http://test" },
              c: "Link"
            }
          ]
        }}
      </BodyRenderer>
    )
  ).toMatchSnapshot();
});
