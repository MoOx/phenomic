import { join } from "path"

import color from "chalk"
import fs from "fs-promise"
import { prompt } from  "inquirer"

import {
  version as phenomicVersion,
  peerDependencies as peerDeps,
  optionalPeerDependencies as opPeerDeps,
} from "../../../../package.json"

import questions, { defaultTestAnswers } from "./questions"
import template from "./template"

const themePath = join(__dirname, "../../../../themes/phenomic-theme-base")

export default async function setup(argv) {
  const cwd = process.cwd()
  const testMode = argv.test

  console.log("Note: All values can be adjusted later.")

  try {
    const answers = testMode ? defaultTestAnswers : await prompt(questions)
    const { name, homepage, twitter, repository, ...phenomic } = answers

    const devDependencies = {
      ...peerDeps,
      ...opPeerDeps,
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
    console.log(color.green("Generated package.json file"))

    await fs.copy(themePath, cwd)
    console.log(color.green("Copied theme"))

    console.log(
      color.green("Setup done. Now run \"npm install\" to get started")
    )
  }
  catch (err) {
    console.error(color.red(err))
    process.exit(1)
  }
}
