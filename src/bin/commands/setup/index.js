import color from "chalk"
import { join } from "path"
import fs from "fs-promise"

import { prompt } from  "inquirer"
import questions, { defaultTestAnswers } from "./questions"
import template from "./template"
import {
  version as phenomicVersion,
  peerDependencies as peerDeps,
  optionalPeerDependencies as opPeerDeps,
} from "../../../../package.json"

export default async function setup(argv) {
  const cwd = process.cwd()
  const testMode = argv.test

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

    const boilerplatePath = join(__dirname, "../../../../boilerplate")
    await fs.copy(boilerplatePath, cwd)
    console.log(color.green("Copied boilerplate"))

    console.log(
      color.green("Setup done. Now run \"npm install\" to get started")
    )
  }
  catch (err) {
    console.error(color.red(err))
    process.exit(1)
  }
}
