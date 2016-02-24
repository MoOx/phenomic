export default function importExports(exportPaths) {
  const exports = {}
  Object.keys(exportPaths).forEach((t) => {
    if (typeof exportPaths[t] !== "string") {
      throw new Error(
        "You should only pass file paths as 'exports'. " +
        `You provided: ${ typeof exportPaths[t] }.`,
      )
    }

    let a = require(exportPaths[t])

    // handy thing for babel default try
    if (a.hasOwnProperty("__esModule") && a.hasOwnProperty("default")) {
      a = a.default
    }

    exports[t] = a
  })

  return exports
}
