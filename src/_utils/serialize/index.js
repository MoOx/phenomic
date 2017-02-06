export default (value: any): string => {
  return JSON.stringify(value).replace(/\<\/script>/g, "<\\/script>")
}
