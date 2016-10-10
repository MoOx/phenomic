import test from "ava"
import React from "react"
import { createRenderer } from "react-addons-test-utils"
import expect from "expect"
import expectJSX from "expect-jsx"

import BodyContainer from "../index.js"

expect.extend(expectJSX)
const Noop = () => {}

test("should wrap html", () => {
  const html = "<a>test</a>"
  const renderer = createRenderer()
  renderer.render(
    <BodyContainer>{ html }</BodyContainer>
  )
  expect(renderer.getRenderOutput()).toEqualJSX(
    <div
      className="phenomic-BodyContainer"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
})

test("should wrap html and children", () => {
  const html = "<a>test</a>"
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
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Noop />
      <div
        key={ 2 }
        className="phenomic-BodyContainer"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </div>
  )
})

test("should accept props", () => {
  const html = "<a>test</a>"
  const renderer = createRenderer()
  renderer.render(
    <BodyContainer className="test">{ html }</BodyContainer>
  )
  expect(renderer.getRenderOutput()).toEqualJSX(
    <div
      className="test"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
})

test("should accept props for wrapper", () => {
  const html = "<a>test</a>"
  const renderer = createRenderer()
  renderer.render(
    <BodyContainer className="test">{ html }<Noop /></BodyContainer>
  )
  expect(renderer.getRenderOutput()).toEqualJSX(
    <div className="test">
      <div
        key={ 1 }
        className="phenomic-BodyContainer"
        dangerouslySetInnerHTML={{ __html: html }}
      />
      <Noop />
    </div>
  )
})
