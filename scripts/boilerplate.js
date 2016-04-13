import lnfs from "lnfs"
import testFolder from "./utils/test-folder.js"

const target = "boilerplate"
testFolder(
  target,
  {
    test: false,
    // boilerplate cleanup
    cleanup: async () => Promise.all([
      await lnfs("docs/package.json", "boilerplate/package.json"),
    ]),
  }
)
