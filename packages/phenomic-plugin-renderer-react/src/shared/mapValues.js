const mapValues = (object: Object, func: Function) => {
  return Object.keys(object).reduce((acc, key) =>
    Object.assign(acc, {
      [key]: func(object[key], key),
    })
  , {})
}

export default mapValues
