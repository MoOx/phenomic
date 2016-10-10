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
const htmlProps = { lang: "en" }

const renderer = (...args) => {
  const render = createRenderer()
  render.render(...args)
  return render.getRenderOutput()
}

test("should render Html componnent", () => {
  expect(
    renderer(
      <Html
        htmlProps={ htmlProps }
        head={ head }
        body={ body }
        script={ script }
      >
        <p>{ "foo" }</p>
      </Html>
    )
  ).toEqualJSX(
    <html
      lang="en"
    >
      <head dangerouslySetInnerHTML={{ __html: head }} />
      <body>
        <div
          dangerouslySetInnerHTML={{ __html: body }}
          id="phenomic"
        />
        <script dangerouslySetInnerHTML={{ __html: script }} />
        <p>{ "foo" }</p>
      </body>
    </html>
  )
})
