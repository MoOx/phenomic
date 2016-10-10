import { execSync } from "child_process"

import semver from "semver"
import colors from "chalk"

import pkg from "../../package.json"

module.exports = function() {
  const requirements = pkg.engines
  const nodeVersion = process.env.TESTING
    ? process.env.FAKE_NODE_VERSION
    : process.version

  const npm = /^win/.test(process.platform) ? "npm.cmd" : "npm"
  const npmVersion = process.env.TESTING ?
    process.env.FAKE_NPM_VERSION :
    execSync(npm + " --version").toString().trim()

  if (!(
    semver.satisfies(nodeVersion, requirements.node) &&
    semver.satisfies(npmVersion, requirements.npm)
  )) {
    const errorMessage = colors.yellow(
      "\n⚠️ " + "Phenomic requires at least " +
      "node@" + requirements.node + " and npm@" + requirements.npm +
      "\n\n" +
      "Your node version is " + nodeVersion +
      " and your npm version is " + npmVersion +
      "\n\n" +
      colors.yellow("See 'Setup' instruction in documentation.") +
      " " +
      "https://phenomic.io/docs/setup/"
    )

    if (process.env.TESTING) {
      throw new Error(errorMessage)
    }

    console.error(errorMessage)
    process.exit(1)
  }
}
