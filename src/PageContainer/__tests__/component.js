import test from "ava"; import "babel-core/register"

import expect from "expect"
import expectJSX from "expect-jsx"
expect.extend(expectJSX)

import React from "react"
import { createRenderer } from "react-addons-test-utils"
import PageContainer from "../component"

// fixtures
/* eslint-disable react/no-multi-comp */
const noop = () => {}
const Page = () => <div className="Page"></div>
const PageError = () => <div className="PageError"></div>
const AnotherPage = () => <div className="AnotherPage"></div>

test("should render a Page if page is ok", () => {
  const renderer = createRenderer()
  renderer.render(
    <PageContainer
      params={ { splat: "" } }
      pages={ { "": {} } }
      getPage={ noop }
    />,
    { layouts: { Page } },
  )

  expect(
    renderer.getRenderOutput(),
  )
  .toEqualJSX(
    <div>
      <Page />
    </div>
  )
})

test(`should render a visible error if page is not ok and no PageError
available`, () => {
  const renderer = createRenderer()
  renderer.render(
    <PageContainer
      params={ { splat: "" } }
      pages={ { "": { error: "Test", errorText: "" } } }
      getPage={ noop }
    />,
    { layouts: { Page } }
  )

  expect(
    renderer.getRenderOutput(),
  )
  .toEqualJSX(
    <div>
      <div style={ { "text-align": "center" } }>
        <h1>{ "Test" }</h1>
        <p>{ "" }</p>
      </div>
    </div>
  )
})

test(`should render a PageError if page is not ok and PageError is available`,
() => {
  const renderer = createRenderer()
  renderer.render(
    <PageContainer
      params={ { splat: "" } }
      pages={ { "": { error: "Test" } } }

      getPage={ noop }
    />,
    { layouts: { Page, PageError } }
  )

  expect(
    renderer.getRenderOutput(),
  )
  .toEqualJSX(
    <div>
      <PageError error="Test" />
    </div>
  )
})

test("should render a another page layout if defaultLayout is used", () => {
  const renderer = createRenderer()
  renderer.render(
    <PageContainer
      params={ { splat: "" } }
      pages={ { "": {} } }
      getPage={ noop }
      defaultLayout={ "AnotherPage" }
    />,
    { layouts: { AnotherPage } }
  )

  expect(
    renderer.getRenderOutput(),
  )
  .toEqualJSX(
    <div>
      <AnotherPage />
    </div>
  )
})
