import test from "ava"; import "babel-core/register"

import { sep } from "path"

import joinUri from ".."

test("should join 2 uri parts", (t) => (
  t.is(
    joinUri("some", "thing"),
    "some/thing"
  )
))

test("should join multiple uri parts", (t) => (
  t.is(
    joinUri("some", "thing", "else"),
    "some/thing/else"
  )
))

test("should join and fix windows shit (on windows :trollface:)", (t) => (
  t.is(
    joinUri("some", "thing", `else${ sep }from${ sep }windows`),
    "some/thing/else/from/windows"
  )
))
