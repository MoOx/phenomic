import "babel-polyfill"

import color from "chalk"
import { join } from "path"
import fs from "fs-extra"

import { prompt } from  "../utils/inquirer"
import questions, { defaultTestAnswers } from "../data/questions"
import template from "../data/template"
import {
  version as statinamicVersion,
  peerDependencies as peerDeps,
  optionalPeerDependencies as opPeerDeps,
} from "../../../package.json"

export default async function setup(argv) {
  const cwd = process.cwd()

  try {
    let answers
    const testMode = argv.test

    if (testMode) {
      answers = defaultTestAnswers
    }
    else {
      answers = await prompt(questions)
    }
    const { name, homepage, ...statinamic } = answers

    const devDependencies = {
      ...peerDeps,
      ...opPeerDeps,
      ...!testMode && {
        statinamic: `^${ statinamicVersion }`,
      },
    }

    const pkg = {
      ...template,
      name,
      homepage,
      statinamic,
      devDependencies,
    }

    fs.writeJsonSync(join(cwd, "package.json"), pkg)
    console.log(color.green("Generated package.json file"))

    const boilerplatePath = join(__dirname, "../../../boilerplate")
    fs.copySync(boilerplatePath, cwd)
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
