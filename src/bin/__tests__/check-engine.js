import test from "jest-ava-api"

// module.exports is used
// eslint-disable-next-line import/default
import checkEngine from "../check-engine"

test("should not throw when sastifies", (t) => {
  t.notThrows(
    () => checkEngine("6.0.0", "3.0.0"),
  )
})

test("should throw", (t) => {
  t.throws(
    () => checkEngine("3.0.0", "2.0.0"),
    (error) => error.message.includes("node version is 3.0.0"),
    "when node version doesn't sastify"
  )

  t.throws(
    () => checkEngine("4.2.0", "2.0.0"),
    (error) => error.message.includes("npm version is 2.0.0"),
    "when npm version doesn't sastify"
  )
  t.throws(
    () => checkEngine("3.0.0", "2.0.0"),
    (error) => (
      error.message.includes("node version is 3.0.0") &&
      error.message.includes("npm version is 2.0.0")
    ),
    "when both node and npm version doesn't sastify"
  )
})
