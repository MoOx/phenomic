import { spawn } from "child_process"
import { join } from "path"

const cwd = process.cwd()

export default
  (defaultOptions) =>
  (
    script = "scripts/build.js",
    options,
    {
      config = "scripts/config.js",
    }
  ) => {
    spawn(
      join(__dirname, "runner-cmd.js"),
      [
        join(cwd, script),
        ...options.length === 0 ? defaultOptions : options,
      ],
      {
        stdio: "inherit",
        env: {
          ...process.env,
          BABEL_DISABLE_CACHE: process.env.BABEL_DISABLE_CACHE || 1,
          DEBUG: process.env.DEBUG || "statinamic:*",
          STATINAMIC_CONFIG: process.env.STATINAMIC_CONFIG || join(cwd, config),
        },
      }
    )
  }
