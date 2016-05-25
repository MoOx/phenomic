// @flow
import { writeFile } from "fs-promise"
import { join } from "path"
import globby from "../globby"
import pathToUri from "../../path-to-uri"
import compiler from "./compile-template"

const writeSwRegister = function(
  scope: string,
  distPath: string
): Promise<void> {
  return compiler(
    join(__dirname, "sw-register.template.js"),
    { scope }
  )
  .then((fileContent) => {
    Promise.all([
      writeFile(join(distPath, "sw-register.js"), fileContent),
    ])
  })
}

const writeSw = function(
  scope: string,
  distPath: string,
  pattern: Array<string>
): Promise {
  return globby(pattern, distPath)
  .then((files) => files.map((filename) => pathToUri(scope, "/", filename)))
  .then((files) => (
    compiler(
      join(__dirname, "sw.template.js"),
      {
        scope,
        files: JSON.stringify(files),
        cacheName: Date.now(),
      }
    )
  ))
  .then((fileContent) => {
    writeFile(join(distPath, "sw.js"), fileContent)
  })
}

export default function(
  distPath: string,
  baseUrl: string,
  pattern: Array<string>
): Promise {
  const scope = pathToUri("/", baseUrl, "/")
  return Promise.all([
    writeSwRegister(scope, distPath),
    writeSw(scope, distPath, pattern),
  ])
}
