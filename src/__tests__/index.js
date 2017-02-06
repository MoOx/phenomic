import { Component } from "react"

import {
  PageContainer,
  BodyContainer,
  Link,
  joinUri,
  phenomicLoader,
} from "../index.js"

it("import { PageContainer } from \"phenomic\"", () => {
  expect(typeof PageContainer === "function").toBe(true)
  expect(
    new PageContainer(
      { store: { getState: () => {} } }
    )
    instanceof Component
  ).toBe(true)
})

it("import { BodyContainer } from \"phenomic\"", () => {
  expect(typeof BodyContainer === "function").toBe(true)
  expect(
    new BodyContainer()
    instanceof Component
  ).toBe(true)
})

it("import { Link } from \"phenomic\"", () => {
  // stateless functional component
  expect(typeof Link === "function").toBe(true)
})

it("import { joinUri } from \"phenomic\"", () => {
  expect(typeof joinUri === "function").toBe(true)
})

it("import { phenomicLoader } from \"phenomic\"", () => {
  expect(typeof phenomicLoader === "string").toBe(true)
})
