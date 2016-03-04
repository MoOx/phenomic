import memoize from "lru-memoize"

const fieldTypes = {
  context: "string",
  renderer: "function",
  feedsOptions: "object",
  feeds: "object",
  description: "object",
}

const validator = (
  userConfig = {}
) => {
  const errors = []

  Object.keys(userConfig).forEach((key) => {
    if (!fieldTypes[key]) {
      errors.push(
        `Unknow option '${ key }'.`
      )
    }
    else if (fieldTypes[key] !== typeof userConfig[key]) {
      errors.push(
        `Wrong type for '${ key }': expected '${ fieldTypes[key] }', ` +
        `got '${ typeof userConfig[key] }'.`
      )
    }
  })

  if (errors.length > 0) {
    throw new Error(
      `Your 'content-loader' config is invalid. Please fix the errors: \n- ` +
      errors.join("\n- ") +
      "\n\n" +
      "See 'Configuration' section in documentation."
    )
  }
}

export default memoize(10)(validator)
