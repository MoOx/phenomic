import test from "jest-ava-api"
import React, { createElement } from "react"
import { createRenderer } from "react-addons-test-utils"
import expect from "expect"
import expectJSX from "expect-jsx"

import dom from "../../../_utils/jsdom"
import Link from "../"

process.env.PHENOMIC_USER_URL = "http://localhost/test/"
process.env.PHENOMIC_USER_PATHNAME = "/test/"
dom(process.env.PHENOMIC_USER_URL)

expect.extend(expectJSX)

const renderer = (...args) => {
  const render = createRenderer()
  render.render(...args)
  return render.getRenderOutput()
}

test("should render <a> tag", () => {
  const component = renderer(
    createElement(
      Link,
      {
        to: "/test/",
        className: "foo",
        children: <span />,
      },
    ),
    {
      router: {
        isActive: () => false,
      },
    }
  )

  expect(renderer(component)).toEqualJSX(
    <a
      className="foo"
      onClick={ function noRefCheck() {} }
      style={{ }}
    >
      <span />
    </a>
  )
})

test("should render normal <a> tag if to is not 'local'", () => {
  const component = renderer(
    createElement(
      Link,
      {
        to: "http://test.com",
        className: "foo",
        children: <span />,
      },
    ),
    {
      router: {
        isActive: () => false,
      },
    }
  )

  expect(component.props.href)
  .toEqual("http://test.com")
})

test("should render normal <a> tag if to is not in the same root path", () => {
  const component = renderer(
    createElement(
      Link,
      {
        to: "http://localhost/root",
        className: "foo",
        children: <span />,
      },
    ),
    {
      router: {
        isActive: () => false,
      },
    }
  )

  expect(component.props.href)
  .toEqual("http://localhost/root")

  expect(component).toEqualJSX(
    <a
      href="http://localhost/root"
      className="foo"
    >
      <span />
    </a>
  )
})

test("should allow passing props to <a> tag", () => {
  const component = renderer(
    createElement(
      Link,
      {
        to: "/test/",
        className: "foo",
        disabled: true,
        children: <span />,
      },
    ),
    {
      router: {
        isActive: () => false,
      },
    }
  )

  expect(renderer(component)).toEqualJSX(
    <a
      className="foo"
      disabled
      onClick={ function noRefCheck() {} }
      style={{ }}
    >
      <span />
    </a>
  )
})

test("should have activeClassName when url matched", () => {
  const component = renderer(
    createElement(
      Link,
      {
        to: "/test/",
        className: "foo",
        activeClassName: "bar",
        disabled: true,
        children: <span />,
      },
    ),
    {
      router: {
        isActive: ({ pathname }) => (pathname === "/test/"),
      },
    }
  )

  expect(renderer(component)).toEqualJSX(
    <a
      className="foo bar"
      disabled
      onClick={ function noRefCheck() {} }
      style={{ }}
    >
      <span />
    </a>
  )
})

test("should have activeClassName when url matched with index.html", () => {
  const component = renderer(
    createElement(
      Link,
      {
        to: "/test/",
        className: "foo",
        activeClassName: "bar",
        disabled: true,
        children: <span />,
      },
    ),
    {
      router: {
        isActive: ({ pathname }) => (pathname === "/test/index.html"),
      },
    }
  )

  expect(renderer(component)).toEqualJSX(
    <a
      className="foo bar"
      disabled
      onClick={ function noRefCheck() {} }
      style={{ }}
    >
      <span />
    </a>
  )
})

test("should not have undefined when no activeClassName props", () => {
  const component = renderer(
    createElement(
      Link,
      {
        to: "/test/",
        className: "foo",
        disabled: true,
        children: <span />,
      },
    ),
    {
      router: {
        isActive: ({ pathname }) => (pathname === "/test/"),
      },
    }
  )

  expect(renderer(component)).toEqualJSX(
    <a
      className="foo"
      disabled
      onClick={ function noRefCheck() {} }
      style={{ }}
    >
      <span />
    </a>
  )
})
