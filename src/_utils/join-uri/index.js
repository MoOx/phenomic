import { join, sep } from "path"

const joinUri = (
  sep === "/"
  // unix
  ? (...args) => join(...args)
  // windows require replacement of \ to /
  : (...args) => join(...args).replace(/\\/g, "/")
)

export default joinUri
