// @flow
export default function(
  { config, errors } : { config: PhenomicConfig, errors: Array<string> }
): void {
  const port = Math.trunc(config.devPort)

  if (port > 0) {
    config.devPort = port
  }
  else {
    errors.push(
      "devPort can be a string or a number and must be a legal port"
    )
  }
}
