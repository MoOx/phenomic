/* eslint-disable max-len */
import test from "ava"; import "babel-core/register"
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
      description: "foo\n",
    },
    rawBody: "foo",
    bar: undefined,
  }

  t.same(description(mdObject), expectedObject)
})

test("should generate description with default option", (t) => {
  const mdObject = {
    head: {},
    rawBody: fixtures.basic,
  }

  const expectedResult = "Lorem ipsum\n\nDolor sit amet, consectetur adipisicing elit, sed do eiusmod\ntempor incididunt ut labore et dolore magna aliqua. Ut enim ad…"

  t.same(description(mdObject).head.description, expectedResult)
})

test("should allow setting description in frontmatter", (t) => {
  const mdObject = {
    head: {
      description: "Tokyo rain bridge motion fetishism boat dissident long-chain hydrocarbons disposable sprawl warehouse cardboard Kowloon neon face forwards claymore mine spook cartel voodoo god film tattoo girl dome realism.",
    },
    rawBody: "",
  }

  const expectedResult = "Tokyo rain bridge motion fetishism boat dissident long-chain hydrocarbons disposable sprawl warehouse cardboard Kowloon neon face forwards claymore mine spook cartel voodoo god film tattoo girl dome realism."

  t.same(description(mdObject).head.description, expectedResult)
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

  const expectedResult = "Lorem ipsum\n\nDolor sit amet, consectetur[...]"
  t.same(description(mdObject, opts).head.description, expectedResult)
})

test("should throw if pruneLength is set to 0", (t) => {
  const opts = {
    pruneLength: 0,
  }

  t.throws(() => description({}, opts), "Prune length must be larger than 0")
})

test("should have no problem with special chars", (t) => {
  const mdObject = {
    head: {},
    rawBody: fixtures.specialChars,
  }

  const expectedResult = "Lörém ipšüm dõlœr sït āmêt.\n"

  t.same(description(mdObject).head.description, expectedResult)
})
