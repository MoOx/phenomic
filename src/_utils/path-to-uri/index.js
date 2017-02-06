import { join } from "path"

/**
 * Normalize path into uri
 * Join, replace multiple / or \ to single /
 */
const pathToUri = function(...args: Array<string>): string {
  return join(...args).replace(/(\/|\\)+/g, "/")
}

export default pathToUri
