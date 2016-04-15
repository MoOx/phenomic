import { spawn } from "child_process"
import { join } from "path"

const cwd = process.cwd()

export default
  (defaultOptions) =>
  (argv) => {
    // get real args, after the node script
    // by relying on yargs $0
    const realArgs = process.argv.slice(process.argv.indexOf(argv.$0) + 1)

    // get argv that are not recognized as command by yargs
    const args = realArgs.filter((arg) => argv._.indexOf(arg) === -1)

    const spawnArgs = [
      join(__dirname, "runner-cmd.js"),
      join(cwd, argv.script),
      ...defaultOptions,
      ...args,
    ]

    spawn(
      "node",
      spawnArgs,
      {
        stdio: "inherit",
        env: {
          ...process.env,
          BABEL_DISABLE_CACHE: process.env.BABEL_DISABLE_CACHE || 1,
          DEBUG: process.env.DEBUG || "phenomic:*",
          PHENOMIC_CONFIG:
            process.env.PHENOMIC_CONFIG || join(cwd, argv.config),
        },
      }
    )
    // close current process with spawned code
    // allow to exit(1) if spawned exited with 1
    .on("close", process.exit)
  }
