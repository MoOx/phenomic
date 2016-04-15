import test from "ava"
import writeAppcache from "../"
import mockFs from "mock-fs"
import template from "../template"
import fs from "fs"

test("writeAppcache", async (t) => {
  mockFs({
    "/dist/path": {
      "foo": "foo",
      "bar": "bar",
    },
  })

  const files = [ "/phenomic/bar", "/phenomic/foo" ]
  await writeAppcache("/dist/path/", "/phenomic", [ "**" ])
  const content = fs.readFileSync("/dist/path/manifest.appcache", "utf8")
  t.is(content.toString(), template(files, "/phenomic/"))

  mockFs.restore()
})
