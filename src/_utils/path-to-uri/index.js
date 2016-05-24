// @flow
import { join, sep } from "path"

const pathToUri = function(...args: Array<string>): string {
  return sep === "/"
  // unix
  ? join(...args)
  // windows require replacement of \ to /
  : join(...args).replace(/\\/g, "/")
}

export default pathToUri
