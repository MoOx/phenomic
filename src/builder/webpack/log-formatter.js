// @flow

import colors from "chalk"
import makeSpinner from "ora"
import logSymbols from "log-symbols"

import { plainLog, formatTime } from "../../_utils/log"

let spinner = makeSpinner()

// remove noize from messages
const betterMsg = (msg: string): string => (
  msg
  .replace(process.cwd(), ".")

  // Webpack "Module not found" noize
  .replace(/Error: Cannot resolve 'file' or 'directory'/, "")

  // loader path for css
  .replace(/.\/~\/(css|postcss|sass|less|stylus)-loader(.*)!/g, "")
)

export function handleInvalid() {
  spinner.text = "Updating"
  spinner.start()
}

const isSyntaxError = (msg) => msg.includes("SyntaxError")

export function handleDone(webpackStats: Object) {
  spinner.stop()

  const stats = webpackStats.toJson({}, true)
  if (!webpackStats.hasErrors() && !webpackStats.hasWarnings()) {
    spinner.stream.write(
      logSymbols.success +
      colors.green(" Updated ") +
      `(in ${ formatTime(stats.time / 1000) })`
    )
    return
  }

  if (stats.errors.length) {
    spinner.text = colors.red("Update failed") + "\n"
    spinner.fail()
    spinner = makeSpinner()

    const errors = stats.errors.some(isSyntaxError)
      // Show syntax error first
      ? stats.errors.filter(isSyntaxError)
      : stats.errors
    errors.forEach((msg) => plainLog(`Error in ${ betterMsg(msg) }\n`, "error"))
    return
  }

  spinner.text = colors.yellow("Updated with warnings") + "\n"
  spinner.fail()
  spinner = makeSpinner()
  stats.warnings.forEach(
    (msg) => plainLog(`Warning in ${ betterMsg(msg) } \n`, "warning")
  )
}
