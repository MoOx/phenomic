// transform string as "string" so hardcoded replacements are
// syntaxically correct
export default (values) => Object.keys(values).reduce((obj, key) => {
  const value = values[key]
  return {
    ...obj,
    [key]: (
      typeof value === "string" ||
      typeof value === "object"
      ? JSON.stringify(value)
      : value
    ),
  }
}, {})
