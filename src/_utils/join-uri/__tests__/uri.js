import test from "ava"

import { sep } from "path"

import joinUri from ".."

// Tests for URIs
test("should preserve protocol-relative uri", (t) => (
  t.is(joinUri("//some.site", "page"),
  "//some.site/page")
))

test("should preserve proto with slashed arg", (t) => (
  t.is(joinUri("//some.site/", "///page/thing/"),
  "//some.site/page/thing/")
))

test("should preserve schema", (t) => (
  t.is(joinUri("https://some.site", "page"),
  "https://some.site/page")
))

test("should preserve trailing slash", (t) => (
  t.is(joinUri("https://some.site", "page/"),
  "https://some.site/page/")
))

test("should remove duplicate slash after TLD", (t) => (
  t.is(joinUri("https://some.site/", "/page/"),
  "https://some.site/page/")
))

test("should remove duplicate slashes", (t) => (
  t.is(joinUri("https://some.site/", "/page/", "/index.html"),
  "https://some.site/page/index.html")
))

test("should join query param to root", (t) => (
  t.is(
    joinUri("https://some.site/", "?query=text"),
    "https://some.site?query=text"
  )
))

test("should join query param", (t) => (
  t.is(
    joinUri("https://some.site", "index.html", "?query=text"),
    "https://some.site/index.html?query=text"
  )
))

test("should join multiple query params", (t) => (
  t.is(
    joinUri("https://some.site/", "?first=1", "?second=2"),
    "https://some.site/?first=1&second=2"
  )
))

test("should join relative URI parts", (t) => (
  t.is(
    joinUri("some", "thing"),
    "some/thing"
  )
))

test("should join multipe relative URI parts", (t) => (
  t.is(
    joinUri("some", "thing", "else"),
    "some/thing/else"
  )
))
