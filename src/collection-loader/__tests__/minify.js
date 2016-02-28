import test from "ava"

import minify from "../minify"

test("statinamic/lib/collection-loader/minify", (t) => {
  t.same(
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
