import test from "ava"

import React from "react"
import { createRenderer } from "react-addons-test-utils"
import expect from "expect"
import expectJSX from "expect-jsx"

expect.extend(expectJSX)

import Html from "../Html"

const head = "head"
const body = "body"
const script = "script"

const renderer = (...args) => {
  const render = createRenderer()
  render.render(...args)
  return render.getRenderOutput()
}

test("should render html string", () => {
  expect(
    renderer(
      <Html
        head={ head }
        body={ body }
        script={ script }
      />
    )
  ).toEqualJSX(
    <html
      lang="en"
    >
      <head dangerouslySetInnerHTML={ { __html: head } } />
      <body>
        <div
          dangerouslySetInnerHTML={ { __html: body } }
          id="phenomic"
        />
        <script dangerouslySetInnerHTML={ { __html: script } } />
      </body>
    </html>
  )
})

test("should render html string, manifest and children", () => {
  expect(
    renderer(
      <Html
        head={ head }
        body={ body }
        script={ script }
        manifest="manifest"
      >
        <p>{ "foo" }</p>
      </Html>
    )
  ).toEqualJSX(
    <html
      lang="en"
      manifest="manifest"
    >
      <head dangerouslySetInnerHTML={ { __html: head } } />
      <body>
        <div
          dangerouslySetInnerHTML={ { __html: body } }
          id="phenomic"
        />
        <script dangerouslySetInnerHTML={ { __html: script } } />
        <p>{ "foo" }</p>
      </body>
    </html>
  )
})
