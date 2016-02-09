import test from "ava"; import "babel-core/register"

import configurator from ".."

const pkg = {
  homepage: "https://localhost:8080/statinamic",
  statinamic: {
    "test-test": true,
  },
}
const config = configurator(pkg, [ "--production" ])

test("should return an 'baseUrl' object in the config", (t) => {
  t.is(
    typeof config.baseUrl,
    "object"
  )
})

test("should contain 'hostname' in 'baseUrl'", (t) => {
  t.is(
    config.baseUrl.hostname,
    "localhost"
  )
})

test("should contain 'port' in 'baseUrl'", (t) => {
  t.is(
    config.baseUrl.port,
    "8080"
  )
})

test("should contain 'pathname' in 'baseUrl'", (t) => {
  t.is(
    config.baseUrl.pathname,
    "/statinamic/"
  )
})

test("should change case of 'statinamic' object", (t) => {
  t.is(
    config.testTest,
    true
  )
})
