import test from "ava"

import minify from "../minify"

test("phenomic/lib/loader/minify", (t) => {
  t.deepEqual(
    minify([
      {
        head: { title: "" },
        body: "whatever",
        __filename: "test.t",
        __url: "test",
        __resourceUrl: "test/index.html",
        __dataUrl: "test/index.html.json",
      },
    ]),
    [
      {
        title: "",
        __filename: "test.t",
        __url: "test",
        __resourceUrl: "test/index.html",
        __dataUrl: "test/index.html.json",
      },
    ],
    "should create a minified collection (without body)"
  )
})
