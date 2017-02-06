import colors from "chalk"
import logSymbols from "log-symbols"
import ora from "ora"

const symbolOrSuccess = (symbol?: string): string => {
  return logSymbols[symbol ? symbol : "success"]
}

// eslint-disable-next-line import/no-mutable-exports
export let start: Date = new Date()
let lastTime: Date = new Date()

// for testing
export const setStartTime = (t: Date): void => {
  start = t
}
export const setTime = (t: Date): void => {
  lastTime = t
}

export const formatTime = (time: number) => {
  return Math.round(time * 100) / 100 + "s"
}

export const elapsedTime = (now: Date = new Date(), time: Date = lastTime) => {
  const diff = (now.getTime() - time.getTime()) / 1000
  lastTime = now
  if (diff < 0.1) {
    return ""
  }

  const color = diff < 1 ? colors.gray : colors.blue
  return color("+" + formatTime(diff))
}

export const totalElapsedTime = (now: Date = new Date()) => {
  return elapsedTime(now, start)
}

export const plainLog = (message: string, symbol: string = "info"): void => {
  console.log(logSymbols[symbol], message)
}

export default (
  message: string,
  action?: Promise<any> | Function | string,
): Promise<any> | any => {
  // the space is used to avoid shitty collapsed message from other modules
  // that can happen during a loading...
  const spinner = ora(message + " ")

  if (action && action.then) {
    spinner.start()
    // $FlowFixMe when we use .start() above, flow miss the action.then test...
    return action.then(
      (res) => {
        spinner.text += elapsedTime()
        spinner.succeed()
        return res
      },
      (res) => {
        spinner.text += elapsedTime()
        spinner.fail()
        return res
      }
    )
  }
  if (typeof action === "function") {
    spinner.start()
    try {
      const res = action()
      spinner.text += elapsedTime()
      spinner.succeed()
      return res
    }
    catch (e) {
      spinner.text += elapsedTime()
      spinner.fail()
      throw e
    }
  }

  // else
  spinner.text += elapsedTime()
  spinner.stopAndPersist(symbolOrSuccess(action && String(action)))
}
