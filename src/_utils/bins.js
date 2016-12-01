// ⚠️ Used in postinstall, so es6 - imports - not transpiled

const resolve = require("path").resolve

const platformSuffix = process.platform === "win32" ? ".cmd" : ""

module.exports = {
  babelNode: resolve("./node_modules/.bin/babel-node" + platformSuffix),
  npm: "npm" + platformSuffix,
  yarn: "yarn" + platformSuffix,
}
