import test from "ava"
import mockFs from "mock-fs"
import globby from "../globby"

const defaultPattern = [ "**", "!**/*.html", "index.html" ]
test("default offline pattern", async (t) => {
  mockFs({
    "/dist/path": {
      "index.html": "",
      "index.json": "",
      "404.html": "",
      "foo": {
        "bar": {
          "index.html": "",
          "index.json": "",
        },
      },
    },
  })

  const files = await globby(defaultPattern, "/dist/path/")
  const expectedFiles = [
    "foo/bar/index.json",
    "index.json",
    "index.html",
  ]

  t.deepEqual(files, expectedFiles)

  mockFs.restore()
})
