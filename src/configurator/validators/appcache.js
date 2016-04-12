// @flow
export default (
  { config, errors }:
  { config: PhenomicConfig, errors: Array<string>}
) => {
  if (typeof config.appcache === "string") {
    config.appcache = [ config.appcache ]
  }
  // Default value if set true
  else if (typeof config.appcache === "boolean" && config.appcache) {
    config.appcache = [ "**/*.*", "!**/*.html", "index.html" ]
  }
  // not sure why yet, but yargs send "undefined", if an option as default to
  // false with not defined type
  else if (config.appcache === null || config.appcache === undefined) {
    config.appcache = false
  }
  else if (
    !Array.isArray(config.appcache) &&
    typeof config.appcache !== "boolean"
  ) {
    errors.push(
      `You provided an '${ typeof config.appcache }' for 'appcache' option. ` +
      "This option accepts a boolean value, a string, or an array."
    )
  }

  // Disable appcache for development
  if (config.dev) {
    config.appcache = false
  }
}
