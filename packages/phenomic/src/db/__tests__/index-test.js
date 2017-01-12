const db = require("..")

describe("db", () => {

  beforeEach(() => {
    jest.resetModuleRegistry()
  })

  it("should be able to put & get a value", () => {
    return db.put("foo", "bar", { data: { title: "bar" } })
      .then(() => db.get("foo", "bar"))
      .then(value => expect(value).toMatchSnapshot())
  })

  it("should throw when value isn't there", () => {
    return db.get("foo", "baz")
      .catch(error => expect(error).toMatchSnapshot())
  })

})
