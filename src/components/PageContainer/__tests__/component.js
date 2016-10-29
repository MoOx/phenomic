import React, { createElement as jsx } from "react"
import { createRenderer } from "react-addons-test-utils"

import PageContainer from "../component"
import dom from "../../../_utils/jsdom"

// just saw PageContainer think its on the client
dom("http://localhost/")

// fixtures
/* eslint-disable react/no-multi-comp */
const noop = () => {}
const Page = (props: Object) => (
  props.isLoading
  ? <div className="isLoading" />
  : <div className="Page" />
)
Page.hasLoadingState = true
const PageError = () => <div className="PageError" />
const AnotherPage = () => <div className="AnotherPage" />

const defaultTestProps = {
  params: { splat: "" },
  pages: { "/": {} },
  getPage: noop,
  setPageNotFound: noop,
  layouts: { Page },
  logger: {
    log: () => {},
    info: () => {},
    error: () => {},
  },
}

const emptyContext = {
  collection: [],
}

it("should render a Page if page is ok", () => {
  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      defaultTestProps,
    ),
    emptyContext,
  )
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})

it("should be able to render a loading state", () => {
  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        ...defaultTestProps,
        // isLoading handled by redux actions
        pages: { "/": { isLoading: true } },
      }
    ),
    emptyContext,
  )
  expect(renderer.getRenderOutput()).toMatchSnapshot()
})

it("should try to get a page if no page in cache", () => {
  const getPage = jest.fn()
  const setPageNotFound = jest.fn()

  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        ...defaultTestProps,
        pages: { },
        getPage,
        setPageNotFound,
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
        ...defaultTestProps,
        pages: { "/": { error: "Test", errorText: "" } },
      }
    ),
    emptyContext,
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
        ...defaultTestProps,
        layouts: { Page, PageError },
        pages: { "/": { error: "Test" } },
      }
    ),
    emptyContext,
  )

  expect(renderer.getRenderOutput()).toMatchSnapshot()
})

it("should render a another page layout if defaultLayout is used", () => {
  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        ...defaultTestProps,
        defaultLayout: "AnotherPage",
        layouts: { AnotherPage },
      }
    ),
    emptyContext,
  )

  expect(renderer.getRenderOutput()).toMatchSnapshot()
})

it("should notify for Page not found", () => {
  jest.resetModules()
  const getPage = jest.fn()
  const setPageNotFound = jest.fn()
  const logger = {
    error: jest.fn(),
    info: jest.fn(),
  }

  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        ...defaultTestProps,
        pages: { },
        getPage,
        setPageNotFound,
        layouts: { Page },
        logger,
      }
    ),
    emptyContext,
  )
  expect(getPage).not.toBeCalled()
  expect(setPageNotFound).toBeCalledWith("/")
  expect(logger.error).toBeCalledWith(
    "phenomic: PageContainer: / is a page not found."
  )
})

it("should log error if default layout doesn't exits", () => {
  jest.resetModules()
  const logger = {
    error: jest.fn(),
    info: jest.fn(),
  }

  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        ...defaultTestProps,
        defaultLayout: "AnotherPage",
        logger,
      }
    ),
    emptyContext,
  )
  expect(logger.error.mock.calls.length).toBe(1)
  expect(logger.error.mock.calls[0][0])
    .toMatch(
      /default layout \"AnotherPage\" not provided./
    )
})

it("should log error if required layout doesn't exits", () => {
  jest.resetModules()
  const logger = {
    error: jest.fn(),
    info: jest.fn(),
  }

  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        ...defaultTestProps,
        pages: { "/": {
          type: "SomePage",
        } },
        logger,
      }
    ),
    emptyContext,
  )
  expect(logger.error.mock.calls.length).toBe(1)
  expect(logger.error.mock.calls[0][0])
    .toMatch(
      /Unkown page type: \"SomePage\"/
    )
})

it("should notify if page is not an object", () => {
  const logger = {
    info: jest.fn(),
  }
  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        ...defaultTestProps,
        pages: { "/": [] },
        logger,
      }
    ),
    emptyContext,
  )
  expect(logger.info.mock.calls[2][0])
    .toMatch(
      /page \/ should be an object/
    )
})

it("should redirect if url doesn't match needed", () => {
  dom("http://localhost/foo")

  // reset browserHistory to get a correct redirect
  jest.resetModules()
  process.env.PHENOMIC_USER_PATHNAME = "/"
  const PageContainer = require("../component").default

  const logger = {
    info: jest.fn(),
  }

  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        ...defaultTestProps,
        params: { splat: "foo/" },
        pages: { "/foo/": {} },
        logger,
      }
    ),
    {
      collection: [ {
        __url: "/foo/",
      } ],
    },
  )
  expect(logger.info.mock.calls[1][0])
    .toMatch(
      // replacing by '/foo' to '/foo/'
      /replacing by \'\/foo\' to \'\/foo\/\'/
    )
  expect(
    window.location.href
  ).toEqual(
    "http://localhost/foo/"
  )
})

it("should redirect and keep url parameters", () => {
  dom("http://localhost/foo?test=yes")

  // reset browserHistory to get a correct redirect
  jest.resetModules()
  process.env.PHENOMIC_USER_PATHNAME = "/"
  const PageContainer = require("../component").default

  const logger = {
    info: jest.fn(),
  }

  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        ...defaultTestProps,
        params: { splat: "foo/" },
        pages: { "/foo/": {} },
        logger,
      }
    ),
    {
      collection: [ {
        __url: "/foo/",
      } ],
    },
  )

  expect(logger.info.mock.calls[1][0])
    .toMatch(
      // replacing by '/foo?test=yes' to '/foo/?test=yes'
      /replacing by \'\/foo\?test=yes\' to \'\/foo\/\?test=yes\'/
    )
  expect(
    window.location.href
  ).toEqual(
    "http://localhost/foo/?test=yes"
  )
})

it("should NOT redirect if url contains hash", () => {
  jest.resetModules()
  const logger = {
    error: jest.fn(),
    info: jest.fn(),
  }

  process.env.PHENOMIC_USER_PATHNAME = "/"
  dom("http://localhost/foo/#some-hash")

  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        ...defaultTestProps,
        params: { splat: "foo/" },
        pages: { "/foo/": {} },
        logger,
      }
    ),
    {
      collection: [ {
        __url: "/foo/",
      } ],
    },
  )
  expect(
    window.location.href
  ).toEqual(
    "http://localhost/foo/#some-hash"
  )
})
