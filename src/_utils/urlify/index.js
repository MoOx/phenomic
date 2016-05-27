// @flow
import pathToUri from "../path-to-uri"

export const fileExtensionRE = /\.html?$/

export default function urlify(
  string: string,
  full: boolean = false
): string {
  const hasExtension = string.match(fileExtensionRE)

  let url = string

  // replace windows backslash by slash
  // before playing more with the url
  url = url.replace(/\\/g, "/")

  url = url
    // something/index.md => something
    .replace(/\bindex\.md$/, "")
    // something-else.md => something-else
    .replace(/\.md$/, "")

  // if url is not and html file, we will tweak it a little bit depending on the
  // length wanted (full url or folder url)
  if (!hasExtension) {
    if (full) {
      // url without extension => folder => index.html
      url = pathToUri(url, "index.html")
    }
    else {
      // url without extension => folder
      if (url.length && !url.endsWith("/")) {
        url += "/"
      }
    }
  }
  // else, url with a file extension, don't touch

  // no relative url
  url = url.replace(/^\.\//, "")

  return url
}
