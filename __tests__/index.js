import test from "ava"
import globby from "globby"

const files = globby.sync("**/*", {
  cwd: "../test-boilerplate/dist",
  nodir: true,
})

test("should have a CSS file", (t) => {
  t.is(
    files.filter(
      (file) => file.startsWith("statinamic-client.") && file.endsWith(".css")
    ).length,
    1
  )
})

// babel-plugin-webpack-loaders garbage
test("should not have lot's of main CSS files", (t) => {
  t.is(
    files.filter(
      (file) => file.startsWith("main.") && file.endsWith(".css")
    ).length,
    0
  )
})
