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

test("PageContainer is properly rendered", () => {
  const renderer = createRenderer()

  renderer.render(
    <PageContainer
      params={ { splat: "" } }
      pages={ { "": {} } }
      pageComponents={ { Page } }
      getPage={ noop }
    />
  )

  expect(
    renderer.getRenderOutput(),
  )
  .toEqualJSX(
    <div>
      <Page />
    </div>,
    "should render a Page if page is ok"
  )

  renderer.render(
    <PageContainer
      params={ { splat: "" } }
      pages={ { "": { error: "Test", errorText: "" } } }
      pageComponents={ { Page } }
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
    </div>,
    "should render a visible error if page is not ok and no PageError available"
  )

  renderer.render(
    <PageContainer
      params={ { splat: "" } }
      pages={ { "": { error: "Test" } } }
      pageComponents={ { Page, PageError } }
      getPage={ noop }
    />
  )

  expect(
    renderer.getRenderOutput(),
  )
  .toEqualJSX(
    <div>
      <PageError error="Test" />
    </div>,
    "should render a PageError if page is not ok and PageError is available"
  )
})
