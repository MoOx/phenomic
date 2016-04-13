import { remove as rm } from "fs-promise"
import testFolder, { exec } from "./utils/test-folder.js"

const target = "test-boilerplate"
testFolder(
  target,
  {
    // test-boilerplate cleanup
    cleanup: async () => Promise.all([
      rm("boilerplate/node_modules"),
      rm("boilerplate/package.json"),
      rm("test-boilerplate/!(node_modules)"),
    ]),

    init: async () => {
      await exec("npm init -y", { cwd: target })
      await exec("node ../lib/bin/phenomic setup --test", { cwd: target })
    },
  }
)
