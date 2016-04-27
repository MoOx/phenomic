import test from "ava"
import { join } from "path"
import sinon from "sinon"

import React, { createElement as jsx } from "react"
import { createRenderer } from "react-addons-test-utils"

import cleanNodeCache from "../../_utils/clean-node-cache"
import dom from "../../_utils/jsdom"

// fixtures
/* eslint-disable react/no-multi-comp */
const noop = () => {}
const Page = () => <div className="Page" />

// Don't print noisy log unless I mocked you
test.beforeEach(() => {
  console.info = noop
})
test.afterEach(() => {
  // Clean node cache
  cleanNodeCache(join(__dirname, "../component.js"))
})

test.cb("should notify for page not found", (t) => {
  const spy = sinon.spy()
  console.error = spy

  const PageContainer = require("../component").default
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
        layouts: { Page },
      }
    ),
    {
      collection: [],
    },
  )
  t.true(
    spy.calledWithMatch(/\/ is a page not found/)
  )
})

test("should log error if default layout doesn't exits", (t) => {
  const spy = sinon.spy()
  console.error = spy

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
      }
    ),
    {
      collection: [],
    },
  )
  t.true(spy.calledOnce)
  t.true(
    spy.calledWithMatch(
      /default layout \"AnotherPage\" not provided./
    )
  )
})

test("should log error if required layout doesn't exits", (t) => {
  const spy = sinon.spy()
  console.error = spy

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
      }
    ),
    {
      collection: [],
    },
  )
  t.true(spy.calledOnce)
  t.true(
    spy.firstCall.calledWithMatch(
      /Unkown page type: \"SomePage\"/
    )
  )
})

test("should notify if page is not an object", (t) => {
  const spy = sinon.spy()
  console.info = spy

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
      }
    ),
    {
      collection: [],
    },
  )
  t.true(
    spy.calledWithMatch(
      /page \/ should be an object/
    )
  )
})

test("should redirect if url doesn't match needed", (t) => {
  const spy = sinon.spy()
  console.info = spy

  process.env.PHENOMIC_PATHNAME = "/"
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
      }
    ),
    {
      collection: [ {
        __url: "/foo/",
      } ],
    },
  )
  t.true(
    spy.calledWithMatch(
      // replacing by '/foo' to '/foo/'
      /replacing by \'\/foo\' to \'\/foo\/\'/
    )
  )
  t.is(
    window.location.href,
    "http://localhost/foo/"
  )
})

test("should NOT redirect if url contains hash", (t) => {
  process.env.PHENOMIC_PATHNAME = "/"
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
      }
    ),
    {
      collection: [ {
        __url: "/foo/",
      } ],
    },
  )
  t.is(
    window.location.href,
    "http://localhost/foo/#some-hash"
  )
})
