import lnfs from "lnfs"

import testFolder from "./utils/test-folder.js"

const target = "themes/phenomic-theme-base"
testFolder(
  target,
  {
    // phenomic-theme-base cleanup
    cleanup: async () => Promise.all([
      await lnfs(
        "docs/package.json",
        "themes/phenomic-theme-base/package.json"
      ),
    ]),
  }
)
