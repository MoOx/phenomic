export default (config, definitions) => {
  const errors = []

  Object.keys(config).forEach((key) => {
    if (!definitions[key]) {
      errors.push(
        `Unknow option '${ key }'.`
      )
    }
    else if (
      definitions[key].type !== undefined &&
      definitions[key].type !== typeof config[key]
    ) {
      errors.push(
        `Wrong type for '${ key }': expected '${ definitions[key].type }', ` +
        `got '${ typeof config[key] }'.`
      )
    }
  })

  return errors
}
