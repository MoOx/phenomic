import test from "jest-ava-api"

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

it("should throw for non collection", () => {
  expect(() =>{
    minify()
  })
  .toThrowError()

  expect(() =>{
    minify(2)
  })
  .toThrowError()

  expect(() =>{
    minify("aze")
  })
  .toThrowError()
})
