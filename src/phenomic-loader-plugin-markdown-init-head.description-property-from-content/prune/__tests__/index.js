import test from "ava"

import prune from ".."

test("should not prune if longer", (t) => (
  t.is(
    prune("Sha blah blah", 100),
    "Sha blah blah"
  )
))

test("should prune if shorter", (t) => (
  t.is(
    prune("Sha blah blah", 6),
    "Sha…"
  )
))

test("should not prune if equal", (t) => (
  t.is(
    prune("Sha blah blah", 13),
    "Sha blah blah"
  )
))
