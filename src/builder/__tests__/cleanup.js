import test from "ava"

import { readFileSync } from "fs"
import mockFs from "mock-fs"

import cleanup from "../cleanup.js"

test("should only keep phenomic.node.bundle", (t) => {
  mockFs({
    "/test": {
      "phenomic.node.bundle.js": "foo",
      "phenomic.node.cf35bdc44eb3b7ac9f07.css": "bar",
    },
  })

  cleanup(
    "/test",
    "phenomic.node.bundle.js",
    [
      "phenomic.node.bundle.js",
      "phenomic.node.cf35bdc44eb3b7ac9f07.css",
    ]
  )

  t.notThrows(() => {
    readFileSync("/test/phenomic.node.bundle.js")
  })

  t.throws(() => {
    readFileSync("/test/phenomic.node.cf35bdc44eb3b7ac9f07.css")
  })

  mockFs.restore()
})
