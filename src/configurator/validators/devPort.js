// @flow
export default function(
  { config, errors } : { config: PhenomicOldConfig, errors: Array<string> }
): void {
  const port = Math.trunc(config.devPort)

  if (port > 0) {
    config.devPort = port
  }
  else {
    errors.push(
      "`devPort` must be a legal http port number"
    )
  }
}
