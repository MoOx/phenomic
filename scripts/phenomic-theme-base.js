import lnfs from "lnfs"
import testFolder from "./utils/test-folder.js"

const target = "phenomic-theme-base"
testFolder(
  target,
  {
    test: false,

    // phenomic-theme-base cleanup
    cleanup: async () => Promise.all([
      await lnfs("docs/package.json", "phenomic-theme-base/package.json"),
    ]),
  }
)
