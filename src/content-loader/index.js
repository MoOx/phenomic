// deprecated
import colors from "chalk"
const loader = require("../phenomic-loader")

console.log("⚠️ " + colors.yellow(
  "'phenomic/lib/content-loader' reference is deprecated.\n" +
  "Please use `import { loader } from \"phenomic\"` " +
  "and use `loader` variable as the reference in webpack configuration.\n" +
  "You will need to update the key used to define phenomic loader options " +
  "in your webpack configuration. Check out the CHANGELOG for more " +
  "informations."
))

module.exports = loader
