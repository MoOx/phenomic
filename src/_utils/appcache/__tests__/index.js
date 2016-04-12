import test from "ava"
import { join } from "path"
import { readFile, unlinkSync } from "fs-promise"
import writeAppcache from ".."
import template from "../template"

test("writeAppcache", async (t) => {
  const distPath = join(__dirname, "fixtures")
  const dest = join(distPath, "manifest.appcache")

  const files = [
    "/phenomic/foo/bar/index.json",
    "/phenomic/index.json",
    "/phenomic/index.html",
  ]

  try {
    unlinkSync(dest)
  }
  catch (e) {/* placeholder */}

  return writeAppcache(
      distPath,
      "/phenomic",
      [ "**/*.*", "!**/*.html", "index.html" ]
    )
    .then(
      () => Promise.all([
        readFile(dest, { encode: "utf-8" }),
      ])
    )
    .then((content) => {
      t.is(
        content.toString(),
        template(files, "/phenomic/")
      )
    })
    .catch((err) => {
      t.fail(err)
    })
})
