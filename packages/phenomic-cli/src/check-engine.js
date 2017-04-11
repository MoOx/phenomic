import { execSync } from "child_process"

import semver from "semver"
import colors from "chalk"
import pkg from "phenomic/package.json"

const platformSuffix = process.platform === "win32" ? ".cmd" : ""
const npm = "npm" + platformSuffix
const yarn = "yarn" + platformSuffix

export default function checkVersion(nodeVersion?: string, npmVersion?: string, yarnVersion?: string | boolean) {
  const requirements = pkg.engines
  nodeVersion = (nodeVersion || process.version)

  npmVersion = (npmVersion || execSync(npm + " --version").toString().trim())

  try {
    yarnVersion = (
      yarnVersion !== undefined
      ? yarnVersion
      : execSync(yarn + " --version").toString().trim()
    )
  }
  catch (e) {
    // nothing, assuming yarn does not exist
    yarnVersion = false
  }

  if (!(
    semver.satisfies(nodeVersion, requirements.node) &&
    (
      semver.satisfies(npmVersion, requirements.npm) ||
      (typeof yarnVersion === "string" && semver.satisfies(yarnVersion, requirements.yarn))
    )
  )) {
    const errorMessage = colors.yellow(
      "\n⚠️ " + "Phenomic requires at least " +
      "node@" + requirements.node +
      " and " +
      "npm@" + requirements.npm + " (or yarn@" + requirements.yarn + ")" +
      "\n\n" +
      "Your node version is " + nodeVersion +
      (yarnVersion ? ", " : " and ") +
      "your npm version is " + npmVersion +
      (
        typeof yarnVersion !== "string" ? "" :
        " and " +
        "your yarn version is " + yarnVersion
      ) +
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
