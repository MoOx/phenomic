import React, { createElement as jsx } from "react"
import { createRenderer } from "react-addons-test-utils"

import PageContainer from "../component"

// fixtures
/* eslint-disable react/no-multi-comp */
const noop = () => {}
const Page = () => <div className="Page" />
const PageError = () => <div className="PageError" />
const AnotherPage = () => <div className="AnotherPage" />

it("should render a Page if page is ok", () => {
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
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})

it("should try to get a page if no page in cache", () => {
  const renderer = createRenderer()
  const getPage = jest.fn()
  const setPageNotFound = jest.fn()

  renderer.render(
    jsx(
      PageContainer,
      {
        params: { splat: "" },
        pages: { },
        getPage,
        setPageNotFound,
        layouts: { Page },
        logger: {
          info: () => {},
        },
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
  expect(getPage).toBeCalledWith("/", "/j.son")
  expect(setPageNotFound).not.toBeCalled()
})

it(`should render a visible error if page is not ok and no PageError
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

  expect(renderer.getRenderOutput()).toMatchSnapshot()
})

it("should render PageError if page not found and PageError is available",
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

  expect(renderer.getRenderOutput()).toMatchSnapshot()
})

it("should render a another page layout if defaultLayout is used", () => {
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

  expect(renderer.getRenderOutput()).toMatchSnapshot()
})
