import { join } from "path"

import color from "chalk"
import fs from "fs-promise"
import globby from "globby"
import { prompt } from  "inquirer"

import { version as phenomicVersion } from "../../../../package.json"
import template from "../../../../themes/phenomic-theme-base/package.json"
import { plainLog as log } from "../../../_utils/log"

import questions, { defaultTestAnswers } from "./questions"

const themePath = join(__dirname, "../../../../themes/phenomic-theme-base")

export default async function setup(argv) {
  const cwd = process.cwd()
  const testMode = argv.test

  log("Note: All values can be adjusted later.")

  try {
    const answers = testMode ? defaultTestAnswers : await prompt(questions)
    const { name, homepage, twitter, repository, ...phenomic } = answers

    const devDependencies = {
      ...template.devDependencies,
      ...!testMode && {
        phenomic: `^${ phenomicVersion }`,
      },
    }

    const pkg = {
      ...template,
      name,
      homepage,
      phenomic,
      twitter,
      repository,
      devDependencies,
    }

    await fs.writeJson(join(cwd, "package.json"), pkg)
    log("`package.json` generated")

    const files = globby.sync(
      [
        "*",
        // node_modules is excluded because can be present during tests
        // (but will never be in public package)
        "!node_modules",
        // already generated
        "!package.json",
        // we assume it's up to the user
        "!yarn.lock",
      ],
      { dot: true, cwd: themePath }
    )
    await Promise.all(files.map((file) => fs.copy(
      join(themePath, file), join(cwd, file)
    )))
    log("Base theme installed")

    log(
      "Project ready. Only one `npm install` and you are good to go!",
      "success"
    )
  }
  catch (err) {
    console.error(color.red(err))
    process.exit(1)
  }
}
