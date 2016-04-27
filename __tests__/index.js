import test from "ava"
import globby from "globby"

const files = globby.sync("**/*", {
  cwd: "../test-boilerplate/dist",
  nodir: true,
})

test("should have a CSS file", (t) => {
  t.is(
    files.filter(
      (file) => file.startsWith("phenomic.browser.") && file.endsWith(".css")
    ).length,
    1
  )
})
