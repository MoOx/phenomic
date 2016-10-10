import url from "url"

import test from "ava"

import normalizeBaseUrl from "../index.js"

test("should normalize base url with a trailing slash", (t) => {
  t.is(
    normalizeBaseUrl(url.parse("http://t.e/st")).href,
    "http://t.e/st/"
  )
})
