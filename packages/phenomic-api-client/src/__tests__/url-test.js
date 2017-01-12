const url = require("../url")

describe("url", () => {

  it("should build URLs", () => {
    expect(url({ collection: "posts", id: "test" })).toMatchSnapshot()
    expect(url({ collection: "posts", by: "tag", value: "test" })).toMatchSnapshot()
    expect(url({ collection: "posts", by: "tag", value: "test", order: "asc" })).toMatchSnapshot()
    expect(url({ collection: "posts", by: "tag", value: "test", order: "asc", limit: 10 })).toMatchSnapshot()
    expect(url({ collection: "posts", by: "tag", value: "test", order: "asc", limit: 10, after: "BASE64" })).toMatchSnapshot()
    expect(url({ root: "local", collection: "posts", by: "tag", value: "test", order: "asc", limit: 10, after: "BASE64" })).toMatchSnapshot()
  })

})
