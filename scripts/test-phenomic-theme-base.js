import { remove as rm } from "fs-promise"

import testFolder, { exec } from "./utils/test-folder.js"

const target = "test-phenomic-theme-base"
testFolder(
  target,
  {
    // test-phenomic-theme-base cleanup
    cleanup: async () => Promise.all([
      // rm("themes/phenomic-theme-base/node_modules"),
      rm("test-phenomic-theme-base/!(node_modules)"),
    ]),

    init: async () => {
      await exec("npm init -y", { cwd: target })
      await exec("node ../lib/bin/phenomic setup --test", { cwd: target })
    },
  }
)
