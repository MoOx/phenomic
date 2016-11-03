
import globby from "globby"

import {
  read,
  exec,
  execOpts,
  phenomic,
  maxTimeout,
} from "./utils"

it("should build the base theme correctly",
() => new Promise((resolve, reject) => {
  const child = exec(
    `${ phenomic } build --cache`, execOpts,
    (err) => {
      if (err && !err.killed) {
        reject("Build should work")
      }

      const testFolder = __dirname + "/../../test-setup/dist"
      const files = globby.sync("**/*", {
        cwd: testFolder,
        nodir: true,
      })

      expect(
        files.length
      )
      .toBeGreaterThan(
        0
      )

      // should have a CSS file
      expect(
        files.filter((file) =>
          file.startsWith("phenomic.browser.") && file.endsWith(".css")
        ).length
      )
      .toEqual(
        1
      )

      // should have html files
      expect(
        files.filter((f) => f.endsWith(".html")).sort()
      )
      .toEqual(
        [
          "404.html",
          "index.html",
          "posts/first-post/index.html",
          "posts/hello-world/index.html",
        ]
      )

      // same tests for all pages
      const html404 = read(testFolder, "404.html")
      expect(html404).toContain(
        "window.__COLLECTION__ = " +
        "[{\"layout\":\"PageError\",\"route\":\"404.html\",\"description\""
      )

      // ensure all pages have the correct title
      expect(html404).toContain(
        ">😱 Oooops"
      )

      expect(html404).toContain(
        "window.__INITIAL_STATE__ = {\"pages\":{\"/404.html\"",
      )

      const htmlIndex = read(testFolder, "index.html")
      expect(htmlIndex).toContain(
        ">Phenomic base theme",
      )

      expect(htmlIndex).toContain(
        "window.__INITIAL_STATE__ = {\"pages\":{\"/\"",
      )

      const htmlFirstPost = read(testFolder, "posts/first-post/index.html")
      expect(htmlFirstPost).toContain(
        ">First Post"
      )
      expect(htmlFirstPost).toContain(
        "window.__INITIAL_STATE__ = {\"pages\":{\"/posts/first-post/\"",
      )

      const htmlHello = read(testFolder, "posts/hello-world/index.html")
      expect(htmlHello).toContain(
        ">Hello World!"
      )
      expect(htmlHello).toContain(
        "window.__INITIAL_STATE__ = {\"pages\":{\"/posts/hello-world/\"",
      )

      child.kill()
      resolve()
    }
  )
}), maxTimeout * 10)
