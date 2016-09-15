import test from "ava"
import colors from "chalk"

import { elapsedTime, setTime } from "../index.js"

test("elasped time", (t) => {
  const start = new Date("2016-09-14T07:00:00.000Z")

  setTime(start)
  t.is(
    elapsedTime(new Date("2016-09-14T07:00:00.001Z")),
    ""
  )

  setTime(start)
  t.is(
    elapsedTime(new Date("2016-09-14T07:00:00.01Z")),
    ""
  )

  setTime(start)
  t.is(
    elapsedTime(new Date("2016-09-14T07:00:00.1Z")),
    colors.gray("+0.1s")
  )

  setTime(start)
  t.is(
    elapsedTime(new Date("2016-09-14T07:00:00.123Z")),
    colors.gray("+0.12s")
  )

  setTime(start)
  t.is(
    elapsedTime(new Date("2016-09-14T07:00:00.160Z")),
    colors.gray("+0.16s")
  )

  setTime(start)
  t.is(
    elapsedTime(new Date("2016-09-14T07:00:02.000Z")),
    colors.blue("+2s")
  )
})
