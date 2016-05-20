// @flow
import urljoin from "url-join"

const joinUri = function(...args: Array<string>): string {
  return urljoin(...args)
}

export default joinUri
