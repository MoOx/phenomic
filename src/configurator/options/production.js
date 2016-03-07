export default ({ pkg, config, errors }) => {
  if (config.production) {
    process.env.NODE_ENV = "production"
    if (!pkg.homepage) {
      errors.push(
        "Your package.json require a 'homepage' field."
      )
    }
  }
}
