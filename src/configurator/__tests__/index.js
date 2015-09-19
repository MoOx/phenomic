import tape from "tape"

import configurator from ".."

tape("statinamic/lib/configurator", (test) => {

  const pkg = {
    homepage: "https://localhost:8080/statinamic",
  }
  const config = configurator(pkg)
  test.equal(
    typeof config.baseUrl,
    "object",
    "should return an 'baseUrl' object in the config"
  )
  test.equal(
    config.baseUrl.hostname,
    "localhost",
    "should contain 'hostname' in 'baseUrl'"
  )
  test.equal(
    config.baseUrl.port,
    "8080",
    "should contain 'port' in 'baseUrl'"
  )
  test.equal(
    config.baseUrl.pathname,
    "/statinamic",
    "should contain 'pathname' in 'baseUrl'"
  )

  test.equal(
    typeof config.consts,
    "object",
    "should return an 'consts' object in the config"
  )

  test.end()
})
