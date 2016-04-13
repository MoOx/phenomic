// @flow
export default function(
  { pkg, config, errors } :
  { pkg: Object, config: PhenomicConfig, errors: Array<string> }
): void {
  if (config.production) {
    process.env.NODE_ENV = "production"
    if (!pkg.homepage) {
      errors.push(
        "Your package.json require a 'homepage' field."
      )
    }
  }
}
