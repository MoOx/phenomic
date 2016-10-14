import { remove, mkdirs } from "fs-promise"
import globby from "globby"

import testFolder, { exec } from "./utils/test-folder.js"

const target = "test-phenomic-theme-base"

testFolder(
  target,
  {
    // test-phenomic-theme-base cleanu
    cleanup: async () => Promise.all(
      globby.sync("test-phenomic-theme-base/!(node_modules)", { dot: true })
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
