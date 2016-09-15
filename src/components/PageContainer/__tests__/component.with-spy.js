import React, { createElement as jsx } from "react"
import { createRenderer } from "react-addons-test-utils"

import dom from "../../../_utils/jsdom"

// fixtures
/* eslint-disable react/no-multi-comp */
const noop = () => {}
const Page = () => <div className="Page" />

it("should notify for Page not found", () => {
  jest.resetModules()
  const getPage = jest.fn()
  const setPageNotFound = jest.fn()
  const logger = {
    error: jest.fn(),
    info: jest.fn(),
  }

  const PageContainer = require("../component").default
  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        params: { splat: "" },
        pages: { },
        getPage,
        setPageNotFound,
        layouts: { Page },
        logger,
      }
    ),
    {
      collection: [],
    },
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

  const PageContainer = require("../component").default
  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        params: { splat: "" },
        pages: { "/": {} },
        defaultLayout: "AnotherPage",
        getPage: noop,
        setPageNotFound: noop,
        layouts: { Page },
        logger,
      }
    ),
    {
      collection: [],
    },
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

  const PageContainer = require("../component").default
  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        params: { splat: "" },
        pages: { "/": {
          type: "SomePage",
        } },
        getPage: noop,
        setPageNotFound: noop,
        layouts: { Page },
        logger,
      }
    ),
    {
      collection: [],
    },
  )
  expect(logger.error.mock.calls.length).toBe(1)
  expect(logger.error.mock.calls[0][0])
    .toMatch(
      /Unkown page type: \"SomePage\"/
    )
})

it("should notify if page is not an object", () => {
  jest.resetModules()
  const logger = {
    error: jest.fn(),
    info: jest.fn(),
  }
  const PageContainer = require("../component").default
  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        params: { splat: "" },
        pages: { "/": [] },
        getPage: noop,
        setPageNotFound: noop,
        layouts: { Page },
        logger,
      }
    ),
    {
      collection: [],
    },
  )
  expect(logger.info.mock.calls[0][0])
    .toMatch(
      /page \/ should be an object/
    )
})

it("should redirect if url doesn't match needed", () => {
  jest.resetModules()
  const logger = {
    error: jest.fn(),
    info: jest.fn(),
  }
  process.env.PHENOMIC_USER_PATHNAME = "/"
  dom("http://localhost/foo")
  const PageContainer = require("../component").default
  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        params: { splat: "foo/" },
        pages: { "/foo/": {} },
        getPage: noop,
        setPageNotFound: noop,
        layouts: { Page },
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
  jest.resetModules()
  const logger = {
    error: jest.fn(),
    info: jest.fn(),
  }

  process.env.PHENOMIC_USER_PATHNAME = "/"
  dom("http://localhost/foo?test=yes")

  const PageContainer = require("../component").default
  const renderer = createRenderer()
  renderer.render(
    jsx(
      PageContainer,
      {
        params: { splat: "foo/" },
        pages: { "/foo/": {} },
        getPage: noop,
        setPageNotFound: noop,
        layouts: { Page },
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

  const PageContainer = require("../component").default
  const renderer = createRenderer()

  renderer.render(
    jsx(
      PageContainer,
      {
        params: { splat: "foo/" },
        pages: { "/foo/": {} },
        getPage: noop,
        setPageNotFound: noop,
        layouts: { Page },
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
