// @flow
// </script> in JSON in HTML can really be an issue
// http://stackoverflow.com/questions/14780858/escape-in-script-tag-contents
// since we are not putting content in <script> here, we can just escape all
// end of script tags
export default (s: string): string => s.replace(/\<\/script>/g, "<\\/script>")
