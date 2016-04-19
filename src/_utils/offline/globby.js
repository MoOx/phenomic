// @flow
import globby from "globby"

export default function(
  pattern: Array<string>,
  cwd: string,
  options?: { [key: string]: any }
): Promise {
  return globby(pattern, {
    cwd,
    nodir: true,
    ...options,
  })
}
