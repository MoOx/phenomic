const mapValues = (object, func) => {
  return Object.keys(object).reduce((acc, key) =>
    Object.assign(acc, {
      [key]: func(object[key], key),
    })
  , {})
}

module.exports = mapValues
