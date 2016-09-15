/* eslint-disable max-len */
import test from "jest-ava-api"

import plugin from ".."

const fixture = `# Lorem __ipsum__

Dolor *sit* amet, __consectetur__ *adipisicing* elit, sed do eiusmod
tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
consequat.

Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
culpa qui officia deserunt mollit anim id est laborum.`

test("should not touch other properties in mdObject", (t) => {
  t.deepEqual(
    plugin({
      frontMatter: {
        content: "foo",
      },
      result: {
        head: {
          foo: null,
        },
        bar: undefined,
      },
    }),
    {
      head: {
        foo: null,
        description: "foo",
      },
      bar: undefined,
    }
  )
})

test("should generate description with default option", (t) => {
  t.is(
    plugin({
      frontMatter: {
        content: fixture,
      },
      result: {
        head: {},
      },
    }).head.description,
    "Lorem ipsum Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad…"
  )
})

test("should allow setting description in frontmatter", (t) => {
  t.is(
    plugin({
      frontMatter: {
        content: "test",
      },
      result: {
        head: {
          description: "Existing desc.",
        },
      },
    }).head.description,
    "Existing desc."
  )
})

test("should allow to override pruneLength and pruneString", (t) => {
  t.is(
    plugin({
      frontMatter: {
        content: fixture,
      },
      result: {},
      options: {
        pruneLength: 50,
        pruneString: "[...]",
      },
    }).head.description,
    "Lorem ipsum Dolor sit amet, consectetur[...]"
  )
})

test("should use default pruneLength if pruneLength = 0", (t) => {
  // Mocking console.warn
  const originalConsole = console.warn
  let called = false
  console.warn = () => called = true

  t.is(
    plugin({
      frontMatter: {
        content: fixture,
      },
      result: {},
      options: {
        pruneLength: 0,
        pruneString: "[...]",
      },
    }).head.description,
    "Lorem ipsum Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad[...]"
  )
  t.true(called)

  console.warn = originalConsole
})
