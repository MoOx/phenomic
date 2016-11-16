import React from "react"
import { createRenderer } from "react-addons-test-utils"

import Html from "../index.js"

test("should render Html component", () => {
  const renderer = createRenderer()
  renderer.render(
    /* eslint-disable react/jsx-no-bind */
    <Html
      css={ [ "test.css" ] }
      js={ [ "test.js" ] }
      renderBody={ () => "<div />" }
      renderScript={ () => <script phenomicStuff /> }
    />
  )
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})

test("should render Html component when glamor available", () => {
  jest.mock(
    "glamor/server",
    () => ({
      renderStatic: (render) => ({
        html: render(),
        css: ".stuff {}",
        ids: [ { id: "s" } ],
      }),
    }),
    { virtual: true }
  )
  const renderer = createRenderer()
  renderer.render(
    /* eslint-disable react/jsx-no-bind */
    <Html
      css={ [ "test.css" ] }
      js={ [ "test.js" ] }
      renderBody={ () => "<div />" }
      renderScript={ () => <script phenomicStuff /> }
    />
  )
  expect(renderer.getRenderOutput()).toMatchSnapshot()
  jest.unmock("glamor/server", { virtual: true })
})
