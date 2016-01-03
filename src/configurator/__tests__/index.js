import test from "ava"; import "babel-core/register"

import configurator from ".."

test("statinamic/lib/configurator", (t) => {

  const pkg = {
    homepage: "https://localhost:8080/statinamic",
  }
  const config = configurator(pkg, [ "--production" ])
  t.is(
    typeof config.baseUrl,
    "object",
    "should return an 'baseUrl' object in the config"
  )
  t.is(
    config.baseUrl.hostname,
    "localhost",
    "should contain 'hostname' in 'baseUrl'"
  )
  t.is(
    config.baseUrl.port,
    "8080",
    "should contain 'port' in 'baseUrl'"
  )
  t.is(
    config.baseUrl.pathname,
    "/statinamic/",
    "should contain 'pathname' in 'baseUrl'"
  )

  t.is(
    typeof config.consts,
    "object",
    "should return an 'consts' object in the config"
  )
})
