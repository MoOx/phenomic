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
