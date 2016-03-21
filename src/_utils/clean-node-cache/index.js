// @flow
import { join } from "path"

export default function cleanNodeCache(
  dir: string
): void {
  Object.keys(require.cache)
  .filter((t) =>
    t.startsWith(dir) &&
    !t.startsWith(join(dir, "node_modules"))
  )
  .forEach((t) => {
    delete require.cache[t]
  })
}
