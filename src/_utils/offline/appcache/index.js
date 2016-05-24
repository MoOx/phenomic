// @flow
import globby from "../globby"
import { join } from "path"
import { writeFile } from "fs-promise"
import template from "./template"
import pathToUri from "../../path-to-uri"

const writeAppcache = function(
  distPath: string,
  baseUrl: string,
  pattern: Array<string>
): Promise {
  const destination = join(distPath, "manifest.appcache")
  const fallback = pathToUri("/", baseUrl, "/")

  return globby(pattern, distPath)
    .then((files) => files.map((file) => pathToUri("/", baseUrl, file)))
    .then((files) => {
      writeFile(destination, template(files, fallback))
    })
}

export default writeAppcache
