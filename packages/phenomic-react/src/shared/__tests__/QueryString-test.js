const QueryString = require("../QueryString")

describe("QueryString", () => {

  it("should encode", () => {
    expect(QueryString.encode({ a: "1", b: "foo" })).toMatchSnapshot()
  })

  it("should decode", () => {
    expect(QueryString.decode("a=1&b=foo")).toMatchSnapshot()
  })

  it("should remove leading '?'", () => {
    expect(QueryString.decode("?a=1&b=foo")).toEqual(QueryString.decode("a=1&b=foo"))
  })

})
