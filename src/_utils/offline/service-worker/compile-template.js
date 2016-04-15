import template from "lodash.template"
import { readFile } from "fs-promise"

/**
 * Read file and return a string with given vars using lodash.template
 */
export default function(
  filePath: string,
  templateVars: Object
): Promise<string> {
  return readFile(filePath, { encode: "utf-8" })
    .then((content) => template(content)(templateVars))
}
