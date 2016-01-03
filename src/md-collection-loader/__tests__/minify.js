import test from "ava"; import "babel-core/register"

import minify from "../minify"

test("statinamic/lib/md-collection-loader/minify", (t) => {
  t.same(
    minify([
      {
        head: { title: "" },
        body: "whatever",
        __filename: "test.t",
        __url: "test",
      },
    ]),
    [
      {
        title: "",
        __filename: "test.t",
        __url: "test",
      },
    ],
    "should create a minified collection (without body)"
  )
})
