// @flow
import { posix } from "path"

const pathToUri = function(...args: Array<string>): string {
  return posix.normalize(
           posix.join(...args).replace(/\\/g, "/")
         )
}

export default pathToUri
