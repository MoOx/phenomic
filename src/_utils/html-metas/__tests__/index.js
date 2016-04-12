import test from "ava"

import url from "url"

import htmlMetas, { defaultMetas } from "../"

test("html default metas", (t) => {
  t.deepEqual(
    htmlMetas(),
    defaultMetas
  )
})

test("html static metas", (t) => {
  t.deepEqual(
    htmlMetas({
      baseUrl: url.parse("http://domain.ext/"),
      css: [ "phenomic-client.css" ],
    }),
    [
      ...defaultMetas,
      "<link rel=\"stylesheet\" href=\"/phenomic-client.css\" />",
    ]
  )
})

test("html static metas with path", (t) => {
  t.deepEqual(
    htmlMetas({
      baseUrl: url.parse("http://domain.ext/basep/"),
      css: [ "phenomic-client.css" ],
    }),
    [
      ...defaultMetas,
      "<link rel=\"stylesheet\" href=\"/basep/phenomic-client.css\" />",
    ]
  )
})
