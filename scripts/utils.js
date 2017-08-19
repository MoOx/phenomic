// @flow

const execSync = require("child_process").execSync;
const spawnSync = require("child_process").spawnSync;

const chalk = require("chalk");

export const runCommand = (
  cmd: string,
  args: Array<string>,
  options: Object = {}
) => {
  console.log(chalk.dim(`$ ${cmd} ${args.join(" ")}\n`));
  const result = spawnSync(cmd, args, { stdio: "inherit", ...options });
  if (result.error || result.status !== 0) {
    const message = "Error running command.";
    const error = new Error(message);
    error.stack = message;
    throw error;
  }
};

export const yarnOrNot = () => {
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
