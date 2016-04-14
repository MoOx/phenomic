import test from "ava"
import mockFs from "mock-fs"
import compiler from "../compile-template"

test("compile template with lodash.template", async (t) => {
  mockFs({
    "/some/path": {
      "template.js": "foo <%= bar %>",
    },
  })

  const result = await compiler("/some/path/template.js", { bar: "bar" })
  t.is(result, "foo bar")

  mockFs.restore()
})
