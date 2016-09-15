import { join } from "path"

import test from "jest-ava-api"

import beautifyHTML from "../../../_utils/beautify-html"
import toHTML, { writeAllHTMLFiles } from "../index"

import collection from "./fixtures/collection.js"
import store from "./fixtures/store.js"

const expectedHTML = {
  [join("destination", "index.html")]:
    require("./results/destination/index.html").default,
  [join("destination", "test-url", "index.html")]:
    require("./results/destination/test-url/index.html").default,
  [join("destination", "test", "index.html")]:
    require("./results/destination/test/index.html").default,
}

test("don't break if there is nothing to transform", async (t) => {
  toHTML({
    routes: require("./fixtures/routes-splat.js").default,
    collection: [],
  })
  .then((files) => {
    t.is(files.length, 0)
  })
  .catch((error) => {
    t.fail(error)
  })
})

test("writeAllHTMLFiles", (t) => {
  // t.plan(3)

  return writeAllHTMLFiles({
    routes: require("./fixtures/routes.js").default,
    collection,
    store,
    assetsFiles: {
      js: [ "test.js" ],
      css: [ "test.css" ],
    },
    destination: "destination",
    baseUrl: { pathname: "/" },
    ghPages: true,
    setPageData: () => {},
    writeHTMLFile: (filename, html) => {
      if (!expectedHTML[filename]) {
        throw new Error(filename + " is missing in expectedHTML results")
      }

      t.deepEqual(
        beautifyHTML(html),
        expectedHTML[filename](),
      )
    },
    forgetPageData: () => {},
  }, true)
  .catch((error) => {
    t.fail(error)
  })
})
