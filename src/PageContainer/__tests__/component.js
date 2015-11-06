import tape from "tape"
import addAssertions from "extend-tape"
import jsxEquals from "tape-jsx-equals"
const test = addAssertions(tape, { jsxEquals })

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

test("PageContainer is properly rendered", (t) => {
  const renderer = createRenderer()

  renderer.render(
    <PageContainer
      params={ { splat: "" } }
      pages={ { "": {} } }
      pageComponents={ { Page } }
      getPage={ noop }
    />
  )
  t.jsxEquals(
    renderer.getRenderOutput(),
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
  t.jsxEquals(
    renderer.getRenderOutput(),
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
  t.jsxEquals(
    renderer.getRenderOutput(),
    <div>
      <PageError error="Test" />
    </div>,
    "should render a PageError if page is not ok and PageError is available"
  )

  t.end()
})
