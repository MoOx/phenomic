const QueryString = {
  encode(object) {
    return Object.keys(object)
      .filter(key => object[key] !== null && object[key] !== undefined)
      .map((key) => `${ encodeURIComponent(key) }=${ encodeURIComponent(object[key]) }`)
      .join("&")
  },
  decode(string) {
    if (string.charAt(0) === "?" || string.charAt(0) === "#") {
      string = string.slice(1)
    }
    const params = string.split("&")
    return params.reduce((acc, param) => {
      const [ key, value ] = param.split("=")
      acc[decodeURIComponent(key)] = decodeURIComponent(value)
      return acc
    }, {})
  },
}

module.exports = QueryString
