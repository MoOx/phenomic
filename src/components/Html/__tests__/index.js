import React from "react"
import { createRenderer } from "react-addons-test-utils"

import Html from "../index.js"

test("should render Html componnent", () => {
  const renderer = createRenderer()
  renderer.render(
    /* eslint-disable react/jsx-no-bind */
    <Html
      css={ [ "test.css" ] }
      js={ [ "test.css" ] }
      renderBody={ () => <div /> }
      renderScript={ () => <script /> }
    />
  )
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})
