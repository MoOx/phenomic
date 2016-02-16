export default function(filename) {
  return (
    filename
    // something/index.md => something
    // note this rule work for generated json files too
    .replace(/\bindex\.(md|json)$/, "")
    // something-else.md => something-else
    .replace(/\.md$/, "")
    // replace windows backslash by slash
    .replace(/\\/g, "/")
    // no leading slash
    .replace(/^\//, "")
    // no trailing slash
    .replace(/\/$/, "")
    // no relative url
    .replace(/^\.$/, "")
    .replace(/^\.\//, "")
  )
}
