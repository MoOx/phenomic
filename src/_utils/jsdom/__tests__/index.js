import test from "jest-ava-api"

import dom from "../"

dom("http://localhost/")

test("sessionStorage and localStorage should be equal", (t) => {
  t.is(window.sessionStorage, window.localStorage)
})

test("localStorage methods", (t) => {
  window.localStorage.setItem("foo", "bar")

  t.is(
    window.localStorage.getItem("foo"),
    "bar"
  )

  window.localStorage.removeItem("foo")

  t.is(
    window.localStorage.getItem("foo"),
    undefined
  )
})
