/* eslint-disable max-len */
import test from "ava"
import description from "../description"
import * as fixtures from "./fixtures/description"

test("should not touch other properties in mdObject", (t) => {
  const mdObject = {
    head: {
      foo: null,
    },
    rawBody: "foo",
    bar: undefined,
  }

  const expectedObject = {
    head: {
      foo: null,
      description: "foo",
    },
    rawBody: "foo",
    bar: undefined,
  }

  t.deepEqual(description(mdObject), expectedObject)
})

test("should generate description with default option", (t) => {
  const mdObject = {
    head: {},
    rawBody: fixtures.basic,
  }

  const expectedResult = "Lorem ipsum Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad…"

  t.is(description(mdObject).head.description, expectedResult)
})

test("should allow setting description in frontmatter", (t) => {
  const mdObject = {
    head: {
      description: "Tokyo rain bridge motion fetishism boat dissident long-chain hydrocarbons disposable sprawl warehouse cardboard Kowloon neon face forwards claymore mine spook cartel voodoo god film tattoo girl dome realism.",
    },
    rawBody: "",
  }

  t.is(description(mdObject).head.description, mdObject.head.description)
})

test("should allow to override pruneLength and pruneString", (t) => {
  const mdObject = {
    head: {},
    rawBody: fixtures.basic,
  }

  const opts = {
    pruneLength: 50,
    pruneString: "[...]",
  }

  const expectedResult = "Lorem ipsum Dolor sit amet, consectetur[...]"
  t.is(description(mdObject, opts).head.description, expectedResult)
})

test("should use default pruneLength if pruneLength < 10", (t) => {
  const opts = {
    pruneLength: 4,
    pruneString: "[...]",
  }

  // Mocking console.warn
  const originalConsole = console.warn
  let called = false
  console.warn = () => {
    called = true
  }
  const mdObject = {
    head: {},
    rawBody: fixtures.basic,
  }

  const expectedResult = "Lorem ipsum Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad[...]"

  t.is(description(mdObject, opts).head.description, expectedResult)
  t.true(called)

  console.warn = originalConsole
})

test("should have no problem with special chars", (t) => {
  const mdObject = {
    head: {},
    rawBody: fixtures.specialChars,
  }

  const expectedResult = "Lörém ipšüm dõlœr sït āmêt."

  t.is(description(mdObject).head.description, expectedResult)
})
