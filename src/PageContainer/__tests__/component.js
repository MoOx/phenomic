import test from "ava"; import "babel-core/register"

import React from "react"
import { createRenderer } from "react-addons-test-utils"
// can't use jsx
// https://github.com/sindresorhus/ava/issues/458
const jsx = React.createElement
import jsxify from "react-element-to-jsx-string"

import PageContainer from "../component"

// fixtures
/* eslint-disable react/no-multi-comp */
const noop = () => {}
const Page = () => jsx("div", { className: "Page" })
const PageError = () => jsx("div", { className: "PageError" })
const AnotherPage = () => jsx("div", { className: "AnotherPage" })

test("should render a Page if page is ok", (t) => {
  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        params: { splat: "" },
        pages: { "/": {} },
        getPage: noop,
        setPageNotFound: noop,
      }
    ),
    {
      layouts: { Page },
      collection: [],
    },
  )

  t.is(
    jsxify(renderer.getRenderOutput()),
    `<div>\n` +
    `  <Page />\n` +
    `</div>`
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
        setPageNotFound: (...args) => {
          console.log(args)
          t.fail()
          t.end()
        },
      }
    ),
    {
      layouts: { Page },
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

test.cb("should notify for page not found", (t) => {
  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        params: { splat: "" },
        pages: { },
        getPage: () => {
          t.fail()
          t.end()
        },
        setPageNotFound: (pageUrl) => {
          t.is(pageUrl, "/")
          t.end()
        },
      }
    ),
    {
      layouts: { Page },
      collection: [ ],
    },
  )
  renderer.getRenderOutput()
})

test(`should render a visible error if page is not ok and no PageError
available`, (t) => {
  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        params: { splat: "" },
        pages: { "/": { error: "Test", errorText: "" } },
        getPage: noop,
        setPageNotFound: noop,
      }
    ),
    {
      layouts: { Page },
      collection: [],
    },
  )

  t.is(
    jsxify(renderer.getRenderOutput()),
    `<div>\n` +
    `  <div style={{'text-align': 'center'}}>\n` +
    `    <h1>\n` +
    `      Test\n` +
    `    </h1>\n` +
    `    <p />\n` +
    `  </div>\n` +
    `</div>`
  )
})

test(`should render a PageError if page is not ok and PageError is available`,
(t) => {
  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        params: { splat: "" },
        pages: { "/": { error: "Test" } },
        getPage: noop,
        setPageNotFound: noop,
      }
    ),
    {
      layouts: { Page, PageError },
      collection: [],
    },
  )

  t.is(
    jsxify(renderer.getRenderOutput()),
    `<div>\n` +
    `  <PageError error="Test" />\n` +
    `</div>`
  )
})

test("should render a another page layout if defaultLayout is used", (t) => {
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
      }
    ),
    {
      layouts: { AnotherPage },
      collection: [],
    },
  )

  t.is(
    jsxify(renderer.getRenderOutput()),
    `<div>\n` +
    `  <AnotherPage />\n` +
    `</div>`
  )
})
