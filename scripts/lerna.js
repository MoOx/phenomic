// @flow

const path = require("path");
const execSync = require("child_process").execSync;
const spawnSync = require("child_process").spawnSync;

const chalk = require("chalk");

const yarnOrNot = () => {
  if (!process.env.PHENOMIC_NO_YARN) {
    try {
      execSync("yarn --version", { stdio: "ignore" });
      return true;
    } catch (e) {
      // false
    }
  }

  return false;
};
function runCommand(cmd, args) {
  console.log(chalk.dim(`$ ${cmd} ${args.join(" ")}\n`));
  const result = spawnSync(cmd, args, { stdio: "inherit" });
  if (result.error || result.status !== 0) {
    const message = "Error running command.";
    const error = new Error(message);
    error.stack = message;
    throw error;
  }
}

console.log(`Setting up Phenomic's development environment...`);
const isWindows = process.platform === "win32";
const lerna = isWindows ? "lerna.cmd" : "lerna";
const cmd = path.resolve(__dirname, "../node_modules/.bin/" + lerna);
const args = process.argv.slice(2);
yarnOrNot() && args.push("--npmClient=yarn");
process.env.CI && args.push("--concurrency=1");

runCommand(cmd, args);
