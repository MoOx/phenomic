import test from "ava"
import pify from "pify"
import { join } from "path"
import mockFs from "mock-fs"
import fs from "fs"
import sw from "../"

const readFile = pify(fs.readFile)

test("should generate sw.js and sw.register.js", async (t) => {
  const templatePath = join(__dirname, "..", "/")
  mockFs({
    "/dist/path": {
      "foo": "foo",
      "bar": "bar",
    },
    // Mock template for easy testing
    [templatePath + "sw-register.template.js"]: "<%= scope %>",
    [templatePath + "sw.template.js"]:
      "<%= scope %>\n<%= cacheName %>\n<%= files %>",
  })

  // Mock Date.now()
  Date.now = () => "cacheName here"

  await sw("/dist/path/", "phenomic", [ "**" ])

  const swRegisterJs = await readFile(
    "/dist/path/sw-register.js",
    { encode: "utf-8" }
  )
  t.is(swRegisterJs.toString(), "/phenomic/")

  const swJs = await readFile(
    "/dist/path/sw.js",
    { encode: "utf-8" }
  )

  t.is(
    swJs.toString(),
    "/phenomic/\n" +
    "cacheName here\n" +
    "[\"/phenomic/bar\",\"/phenomic/foo\"]"
  )

  mockFs.restore()
})
