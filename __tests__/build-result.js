import { readFileSync } from "fs"
import { join } from "path"

import test from "jest-ava-api"
import globby from "globby"

const testFolder = __dirname + "/../test-phenomic-theme-base/dist"
const files = globby.sync("**/*", {
  cwd: testFolder,
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

test("should have html files", (t) => {
  const htmlFiles = files.filter(
    (file) => file.endsWith(".html")
  ).sort()

  const includes = (file, strings) => {
    const content = readFileSync(
      join(testFolder, file),
      { encoding: "utf8" }
    )
    return strings.reduce((acc, s) => {
      const isTheStringInTheContent = content.includes(s)
      if (!isTheStringInTheContent) {
        console.log(s + " is not in " + file)
      }
      return acc && isTheStringInTheContent
    }, true)
  }

  t.deepEqual(
    htmlFiles,
    [
      "404.html",
      "index.html",
      "loading/index.html",
      "posts/first-post/index.html",
      "posts/hello-world/index.html",
    ]
  )

  // same tests for all pages
  t.truthy(includes(
    "404.html",
    [
      "window.__COLLECTION__ = " +
        "[{\"layout\":\"PageError\",\"route\":\"404.html\",\"description\"",
    ]
  ))

  // ensure all pages have the correct title

  t.truthy(includes(
    "404.html",
    [
      ">😱 Oooops",
      "window.__INITIAL_STATE__ = {\"pages\":{\"/404.html\"",
    ]
  ))

  t.truthy(includes(
    "index.html",
    [
      ">Phenomic base theme",
      "window.__INITIAL_STATE__ = {\"pages\":{\"/\"",
    ]
  ))

  t.truthy(includes(
    "loading/index.html",
    [
      ">Loading...",
      "window.__INITIAL_STATE__ = {\"pages\":{\"/loading/\"",
    ]
  ))

  t.truthy(includes(
    "posts/first-post/index.html",
    [
      ">First Post",
      "window.__INITIAL_STATE__ = {\"pages\":{\"/posts/first-post/\"",
    ]
  ))

  t.truthy(includes(
    "posts/hello-world/index.html",
    [
      ">Hello World!",
      "window.__INITIAL_STATE__ = {\"pages\":{\"/posts/hello-world/\"",
    ]
  ))
})
