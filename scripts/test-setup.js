import { remove, mkdirs } from "fs-promise"
import globby from "globby"

import testFolder, { exec } from "./utils/test-folder.js"

const target = "test-setup"

testFolder(
  target,
  {
    // test-setup cleanup
    cleanup: async () => Promise.all(
      globby.sync("test-setup/!(node_modules)", { dot: true })
      .map(
        (file) => remove(file)
      ),
    ),

    init: async () => {
      await mkdirs("node_modules", { cwd: target })
      await exec("node ../lib/bin/phenomic setup --test", { cwd: target })
    },
  }
)
