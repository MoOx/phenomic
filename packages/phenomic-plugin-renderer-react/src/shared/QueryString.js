const QueryString = {
  encode(object: Object) {
    return Object.keys(object)
      .filter(key => object[key] !== null && object[key] !== undefined)
      .map((key) => `${ encodeURIComponent(key) }=${ encodeURIComponent(object[key]) }`)
      .join("&")
  },
  decode(string: string) {
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

export default QueryString
