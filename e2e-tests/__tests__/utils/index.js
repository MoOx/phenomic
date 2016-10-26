import { join } from "path"
import { readFileSync } from "fs"

export { exec } from "child_process"

const target = join(
  __dirname, "..", "..", "..", "test-phenomic-theme-base"
)

export const execOpts = { cwd: target, stdio: "inherit" }
export const phenomic = "node ./node_modules/.bin/phenomic"
export const timing = process.env.CI ? 10000 : 5000
export const maxTimeout = process.env.CI ? 20000 : 10000
export const read = (testFolder, file) => readFileSync(
  join(testFolder, file),
  { encoding: "utf8" }
)
