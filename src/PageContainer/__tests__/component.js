import test from "ava"

import React, { createElement as jsx } from "react"
import { createRenderer } from "react-addons-test-utils"
import expect from "expect"
import expectJSX from "expect-jsx"

expect.extend(expectJSX)

import PageContainer from "../component"

// fixtures
/* eslint-disable react/no-multi-comp */
const noop = () => {}
const Page = () => <div className="Page" />
const PageError = () => <div className="PageError" />
const AnotherPage = () => <div className="AnotherPage" />

test("should render a Page if page is ok", () => {
  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        params: { splat: "" },
        pages: { "/": {} },
        getPage: noop,
        setPageNotFound: noop,
        layouts: { Page },
      }
    ),
    {
      collection: [],
    },
  )
  expect(renderer.getRenderOutput()).toEqualJSX(
    <div>
      <Page ref={ function noRefCheck() {} } />
    </div>
  )
})

test.cb("should try to get a page if no page in cache", (t) => {
  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        params: { splat: "" },
        pages: { },
        getPage: (pageUrl, dataUrl) => {
          t.is(pageUrl, "/")
          t.is(dataUrl, "/j.son")
          t.end()
        },
        setPageNotFound: () => {
          t.fail()
          t.end()
        },
        layouts: { Page },
      }
    ),
    {
      collection: [
        {
          __url: "/",
          __dataUrl: "/j.son",
        },
      ],
    },
  )
  renderer.getRenderOutput()
})

test(`should render a visible error if page is not ok and no PageError
available`, () => {
  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        params: { splat: "" },
        pages: { "/": { error: "Test", errorText: "" } },
        getPage: noop,
        setPageNotFound: noop,
        layouts: { Page },
      }
    ),
    {
      collection: [],
    },
  )

  expect(renderer.getRenderOutput()).toEqualJSX(
    <div>
      <div style={ { "text-align": "center" } }>
        <h1>
          { "Test" }
        </h1>
        <p />
      </div>
    </div>
  )
})

test("should render a PageError if page is not ok and PageError is available",
() => {
  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        params: { splat: "" },
        pages: { "/": { error: "Test" } },
        getPage: noop,
        setPageNotFound: noop,
        layouts: { Page, PageError },
      }
    ),
    {
      collection: [],
    },
  )

  expect(renderer.getRenderOutput()).toEqualJSX(
    <div>
      <PageError error="Test" />
    </div>
  )
})

test("should render a another page layout if defaultLayout is used", () => {
  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        params: { splat: "" },
        pages: { "/": {} },
        getPage: noop,
        setPageNotFound: noop,
        defaultLayout: "AnotherPage",
        layouts: { AnotherPage },
      }
    ),
    {
      collection: [],
    },
  )

  expect(renderer.getRenderOutput()).toEqualJSX(
    <div>
      <AnotherPage ref={ function noRefCheck() {} } />
    </div>
  )
})
