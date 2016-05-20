import test from "ava"

import React from "react"
import { createRenderer } from "react-addons-test-utils"
import expect from "expect"
import expectJSX from "expect-jsx"

expect.extend(expectJSX)

import BodyContainer from "../index.js"

test("should wrap html", () => {
  const html = "<a>test</a>"
  const renderer = createRenderer()
  renderer.render(
    <BodyContainer>{ html }</BodyContainer>
  )
  expect(renderer.getRenderOutput()).toEqualJSX(
    <div>
      <div
        key={ 1 }
        className="phenomic-BodyContainer"
        dangerouslySetInnerHTML={ { __html: html } }
      />
    </div>
  )
})

test("should wrap html and children", () => {
  const html = "<a>test</a>"
  const Noop = () => {}
  const renderer = createRenderer()
  renderer.render(
    <BodyContainer>
      { html }
      <Noop />
      { html }
    </BodyContainer>
  )
  expect(renderer.getRenderOutput()).toEqualJSX(
    <div>
      <div
        key={ 1 }
        className="phenomic-BodyContainer"
        dangerouslySetInnerHTML={ { __html: html } }
      />
      <Noop />
      <div
        key={ 2 }
        className="phenomic-BodyContainer"
        dangerouslySetInnerHTML={ { __html: html } }
      />
    </div>
  )
})
