import test from "ava"; import "babel-core/register"

import expect from "expect"
import expectJSX from "expect-jsx"
expect.extend(expectJSX)

import React from "react"
import { createRenderer } from "react-addons-test-utils"
import PageContainer from "../component"

// yeah that's gross
global.__DEV__ = false

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
      layouts={ { Page } }
      getPage={ noop }
    />
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
      layouts={ { Page } }
      getPage={ noop }
    />
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
      layouts={ { Page, PageError } }
      getPage={ noop }
    />
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
      layouts={ { AnotherPage } }
      getPage={ noop }
      defaultLayout={ "AnotherPage" }
    />
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
