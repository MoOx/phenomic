// @flow

export default (value: any): string => {
  return JSON.stringify(value).replace(/\<\/script>/g, "<\\/script>")
    .replace(/\u2028/g,"\\u2028").replace(/\u2029/g,"\\u2029")
}
