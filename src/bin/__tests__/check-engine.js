import test from "ava"

// module.exports is used
// eslint-disable-next-line import/default
import checkEngine from "../check-engine"

test("should not throw when sastifies", (t) => {
  process.env.FAKE_NODE_VERSION = "6.0.0"
  process.env.FAKE_NPM_VERSION = "3.0.0"
  t.notThrows(checkEngine)
})

test("should throw", (t) => {
  process.env.FAKE_NODE_VERSION = "3.0.0"
  process.env.FAKE_NPM_VERSION = "2.0.0"
  t.throws(
    checkEngine,
    (error) => error.message.includes("node version is 3.0.0"),
    "when node version doesn't sastify"
  )
  process.env.FAKE_NODE_VERSION = "4.2.0"
  process.env.FAKE_NPM_VERSION = "2.0.0"
  t.throws(
    checkEngine,
    (error) => error.message.includes("npm version is 2.0.0"),
    "when npm version doesn't sastify"
  )

  process.env.FAKE_NODE_VERSION = "3.0.0"
  process.env.FAKE_NPM_VERSION = "2.0.0"
  t.throws(
    checkEngine,
    (error) => (
      error.message.includes("node version is 3.0.0") &&
      error.message.includes("npm version is 2.0.0")
    ),
    "when both node and npm version doesn't sastify"
  )
})
