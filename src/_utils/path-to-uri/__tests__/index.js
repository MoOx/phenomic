import test from "ava"

import { sep } from "path"

import pathToUri from ".."

test("should join 2 uri parts", (t) => (
  t.is(
    pathToUri("some", "thing"),
    "some/thing"
  )
))

test("should fix mixed paths", (t) => (
  t.is(
    pathToUri("//some\\", "\\\\thing\\"),
    "/some/thing/"
  )
))

test("should join 2 uri parts with a slash", (t) => (
  t.is(
    pathToUri("some", "/thing"),
    "some/thing"
  )
))

test("should join 2 uri parts with slashes", (t) => (
  t.is(
    pathToUri("some/", "/thing"),
    "some/thing"
  )
))

test("should join multiple uri parts", (t) => (
  t.is(
    pathToUri("some", "thing", "else"),
    "some/thing/else"
  )
))

test("eliminates leading/duplicate slashes", (t) => (
  t.is(
    pathToUri("//one/", "/more/", "//time//"),
    "/one/more/time/"
  )
))

test("should join and fix windows shit (on windows :trollface:)", (t) => (
  t.is(
    pathToUri("some", "thing", `else${ sep }from${ sep }windows`),
    "some/thing/else/from/windows"
  )
))
