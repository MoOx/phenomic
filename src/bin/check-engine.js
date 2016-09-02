const semver = require("semver")
const pkg = require("../../package.json")
const execSync = require("child_process").execSync
const colors = require("chalk")

module.exports = function() {
  const requirements = pkg.engines
  const nodeVersion = process.version
  const npm = /^win/.test(process.platform) ? "npm.cmd" : "npm"

  try {
    const stdout = execSync(npm + " --version")
    const npmVersion = stdout.toString().trim()
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

      console.log(errorMessage)
      process.exit(0)
    }
  }
  catch (err) {
    if (process.env.TESTING) {
      throw err
    }
    // I really don't know when will this happen
    // If a user doesn't have npm, how can they even run this
    const errorMessage = colors.yellow(
      "\n⚠️ " + "Phenomic can't check your npm version." +
      "\n\n"+
      "Make sure you installed " +
      "node@" + requirements.node + " and npm@" + requirements.npm +
      "correctly" +
      "\n\n" +
      colors.yellow("See 'Setup' instruction in documentation.") +
      " " +
      "https://phenomic.io/docs/setup/"
    )
    console.log(errorMessage)
    console.log(colors.red("\n Error stack trace: "))
    console.error(err)
    process.exit(0)
  }
}
